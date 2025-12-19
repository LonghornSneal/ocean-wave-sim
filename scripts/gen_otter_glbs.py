"""Generate the otter GLB assets from scratch.

This project intentionally ships the GLBs in `public/models/otter/` so the web build
doesn't depend on any DCC tooling.

If you want to tweak the silhouette or LOD triangle counts, edit the params below
and re-run:

  python scripts/gen_otter_glbs.py

Outputs:
  public/models/otter/otter_low.glb
  public/models/otter/otter_medium.glb
  public/models/otter/otter_high.glb
"""

from __future__ import annotations

import json
import math
import os
import struct
from dataclasses import dataclass
from typing import List, Tuple

import numpy as np


def _pad4(b: bytes, pad_byte: bytes = b"\x00") -> bytes:
    """Pad to a 4-byte boundary.

    glTF 2.0 has different padding requirements depending on chunk type:
      - JSON chunk: pad with ASCII space (0x20)
      - BIN chunk / bufferViews: pad with 0x00

    Many loaders (including Three.js' GLTFLoader) will *fail* to parse a JSON
    chunk padded with NUL bytes because NUL is not valid JSON whitespace.
    """
    if len(pad_byte) != 1:
        raise ValueError("pad_byte must be a single byte")
    pad = (4 - (len(b) % 4)) % 4
    return b + (pad_byte * pad)


def uv_sphere(lat_seg: int, lon_seg: int, radius: float = 1.0):
    verts = []
    norms = []
    uvs = []
    idx = []
    for i in range(lat_seg + 1):
        v = i / lat_seg
        theta = v * math.pi
        y = math.cos(theta)
        r = math.sin(theta)
        for j in range(lon_seg + 1):
            u = j / lon_seg
            phi = u * 2 * math.pi
            x = r * math.cos(phi)
            z = r * math.sin(phi)
            verts.append((x * radius, y * radius, z * radius))
            norms.append((x, y, z))
            uvs.append((u, 1.0 - v))
    stride = lon_seg + 1
    for i in range(lat_seg):
        for j in range(lon_seg):
            a = i * stride + j
            b = a + stride
            c = a + 1
            d = b + 1
            idx.extend([a, b, c, c, b, d])

    return (
        np.array(verts, dtype=np.float32),
        np.array(norms, dtype=np.float32),
        np.array(uvs, dtype=np.float32),
        np.array(idx, dtype=np.uint16),
    )


def cylinder_y(rad_seg: int = 8, height: float = 1.0, radius: float = 1.0):
    verts = []
    norms = []
    uvs = []
    idx = []
    for j in range(rad_seg + 1):
        u = j / rad_seg
        phi = u * 2 * math.pi
        x = math.cos(phi) * radius
        z = math.sin(phi) * radius
        verts.append((x, -height / 2, z))
        norms.append((math.cos(phi), 0.0, math.sin(phi)))
        uvs.append((u, 0.0))
        verts.append((x, height / 2, z))
        norms.append((math.cos(phi), 0.0, math.sin(phi)))
        uvs.append((u, 1.0))
    for j in range(rad_seg):
        a = 2 * j
        b = a + 1
        c = a + 2
        d = a + 3
        idx.extend([a, b, c, b, d, c])

    return (
        np.array(verts, dtype=np.float32),
        np.array(norms, dtype=np.float32),
        np.array(uvs, dtype=np.float32),
        np.array(idx, dtype=np.uint16),
    )


def harmonic_jitter(verts: np.ndarray, norms: np.ndarray, amount: float, freq: float, seed: float):
    out = verts.copy()
    for i in range(len(verts)):
        x, y, z = verts[i]
        t = (
            math.sin((x * freq + seed) * 1.7) * math.cos((y * freq - seed) * 1.3)
            + math.sin((z * freq * 0.9 + seed * 2.0) * 1.9) * math.cos((x * freq * 0.8 - seed) * 1.1)
        )
        f = t * 0.5 + 0.5
        a = amount * (0.35 + 0.65 * f)
        out[i] += norms[i] * a
    return out


class GLBBuilder:
    def __init__(self):
        self.json = {
            "asset": {"version": "2.0", "generator": "otter_gen_py"},
            "scenes": [{"nodes": [0]}],
            "nodes": [],
            "meshes": [],
            "materials": [],
            "bufferViews": [],
            "accessors": [],
            "buffers": [{"byteLength": 0}],
        }
        self._bin_chunks: List[bytes] = []
        self._byte_len = 0

    def add_material(self, name, baseColorFactor, metallicFactor=0.0, roughnessFactor=0.9):
        self.json["materials"].append(
            {
                "name": name,
                "pbrMetallicRoughness": {
                    "baseColorFactor": baseColorFactor,
                    "metallicFactor": metallicFactor,
                    "roughnessFactor": roughnessFactor,
                },
            }
        )
        return len(self.json["materials"]) - 1

    def add_buffer_view(self, data: bytes, target=None):
        data = _pad4(data)
        offset = self._byte_len
        self._bin_chunks.append(data)
        self._byte_len += len(data)
        bv = {"buffer": 0, "byteOffset": offset, "byteLength": len(data)}
        if target is not None:
            bv["target"] = target
        self.json["bufferViews"].append(bv)
        return len(self.json["bufferViews"]) - 1

    def add_accessor(self, bv_idx, componentType, count, type_str, minv=None, maxv=None):
        acc = {
            "bufferView": bv_idx,
            "byteOffset": 0,
            "componentType": componentType,
            "count": count,
            "type": type_str,
        }
        if minv is not None:
            acc["min"] = minv
        if maxv is not None:
            acc["max"] = maxv
        self.json["accessors"].append(acc)
        return len(self.json["accessors"]) - 1

    def add_mesh(self, name, pos_acc, nrm_acc, uv_acc, idx_acc, material_idx):
        self.json["meshes"].append(
            {
                "name": name,
                "primitives": [
                    {
                        "attributes": {"POSITION": pos_acc, "NORMAL": nrm_acc, "TEXCOORD_0": uv_acc},
                        "indices": idx_acc,
                        "material": material_idx,
                    }
                ],
            }
        )
        return len(self.json["meshes"]) - 1

    def add_node(self, name, mesh=None, children=None, translation=None, rotation=None, scale=None):
        node = {"name": name}
        if mesh is not None:
            node["mesh"] = mesh
        if children:
            node["children"] = children
        if translation is not None:
            node["translation"] = translation
        if rotation is not None:
            node["rotation"] = rotation
        if scale is not None:
            node["scale"] = scale
        self.json["nodes"].append(node)
        return len(self.json["nodes"]) - 1

    def write(self, out_path: str):
        self.json["buffers"][0]["byteLength"] = self._byte_len
        # IMPORTANT: JSON chunk must be padded with spaces (0x20), BIN chunk with NULs.
        j = _pad4(json.dumps(self.json, separators=(",", ":")).encode("utf-8"), pad_byte=b" ")
        b = _pad4(b"".join(self._bin_chunks), pad_byte=b"\x00")

        total_len = 12 + 8 + len(j) + 8 + len(b)
        header = struct.pack("<4sII", b"glTF", 2, total_len)
        chunk0 = struct.pack("<I4s", len(j), b"JSON") + j
        chunk1 = struct.pack("<I4s", len(b), b"BIN\x00") + b

        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        with open(out_path, "wb") as f:
            f.write(header)
            f.write(chunk0)
            f.write(chunk1)


def add_geometry(builder: GLBBuilder, verts, norms, uvs, indices, name, material_idx):
    pos_bv = builder.add_buffer_view(verts.astype("<f4").tobytes(), target=34962)
    nrm_bv = builder.add_buffer_view(norms.astype("<f4").tobytes(), target=34962)
    uv_bv = builder.add_buffer_view(uvs.astype("<f4").tobytes(), target=34962)
    idx_bv = builder.add_buffer_view(indices.astype("<u2").tobytes(), target=34963)

    pos_min = verts.min(axis=0).tolist()
    pos_max = verts.max(axis=0).tolist()

    pos_acc = builder.add_accessor(pos_bv, 5126, len(verts), "VEC3", minv=pos_min, maxv=pos_max)
    nrm_acc = builder.add_accessor(nrm_bv, 5126, len(norms), "VEC3")
    uv_acc = builder.add_accessor(uv_bv, 5126, len(uvs), "VEC2")
    idx_acc = builder.add_accessor(idx_bv, 5123, len(indices), "SCALAR", minv=[int(indices.min())], maxv=[int(indices.max())])

    return builder.add_mesh(name, pos_acc, nrm_acc, uv_acc, idx_acc, material_idx)


def generate_otter_glb(mode: str, out_path: str):
    b = GLBBuilder()

    # Materials (names are used by the runtime to swap in higher-quality Three.js materials)
    fur_mat = b.add_material("Fur", [0.30, 0.21, 0.12, 1.0], roughnessFactor=0.92)
    eye_mat = b.add_material("Eye", [0.02, 0.02, 0.02, 1.0], roughnessFactor=0.55)
    whisk_mat = b.add_material("Whisker", [0.85, 0.82, 0.78, 1.0], roughnessFactor=0.80)

    shell_mat = None
    if mode == "high":
        shell_mat = b.add_material("FurShell", [0.37, 0.27, 0.16, 1.0], roughnessFactor=0.96)

    if mode == "low":
        lat, lon = 8, 10
    elif mode == "medium":
        lat, lon = 12, 14
    else:
        lat, lon = 18, 22

    s_v, s_n, s_uv, s_i = uv_sphere(lat, lon)
    sphere_mesh = add_geometry(b, s_v, s_n, s_uv, s_i, "SphereFur", fur_mat)

    e_v, e_n, e_uv, e_i = uv_sphere(6, 8)
    eye_mesh = add_geometry(b, e_v, e_n, e_uv, e_i, "SphereEye", eye_mat)

    c_v, c_n, c_uv, c_i = cylinder_y(8)
    cyl_mesh = add_geometry(b, c_v, c_n, c_uv, c_i, "CylinderWhisker", whisk_mat)

    shell_mesh = None
    if mode == "high" and shell_mat is not None:
        shell_v = harmonic_jitter(s_v, s_n, amount=0.10, freq=3.8, seed=1.23)
        shell_mesh = add_geometry(b, shell_v, s_n, s_uv, s_i, "SphereShell", shell_mat)

    # Root
    root_idx = b.add_node("OtterRig", children=[])

    # Body base + back hump
    body_scale = [0.60, 0.80, 0.46] if mode != "high" else [0.62, 0.84, 0.48]
    body_y = 0.52
    body_idx = b.add_node("Body", mesh=sphere_mesh, translation=[0, body_y, 0], scale=body_scale)

    back_scale = [0.78, 0.44, 0.60] if mode != "high" else [0.82, 0.46, 0.64]
    back_idx = b.add_node("Back", mesh=sphere_mesh, translation=[0, 0.74, -0.08], scale=back_scale)

    head_scale = 0.40 if mode == "low" else (0.41 if mode == "medium" else 0.42)
    head_idx = b.add_node("Head", mesh=sphere_mesh, translation=[0, 0.86, 0.15], scale=[head_scale] * 3)

    ear_scale = 0.11 if mode == "low" else (0.10 if mode == "medium" else 0.09)
    earL_idx = b.add_node("EarL", mesh=sphere_mesh, translation=[-0.27, 0.23, 0.00], scale=[ear_scale, ear_scale * 0.9, ear_scale])
    earR_idx = b.add_node("EarR", mesh=sphere_mesh, translation=[0.27, 0.23, 0.00], scale=[ear_scale, ear_scale * 0.9, ear_scale])

    eye_scale = 0.05
    eyeL_idx = b.add_node("EyeL", mesh=eye_mesh, translation=[-0.11, 0.05, 0.30], scale=[eye_scale] * 3)
    eyeR_idx = b.add_node("EyeR", mesh=eye_mesh, translation=[0.11, 0.05, 0.30], scale=[eye_scale] * 3)

    # Whiskers group
    whisk_children = []
    whisker_count = 0 if mode == "low" else (6 if mode == "medium" else 8)

    def quat_from_axis_angle(ax, ay, az, ang):
        s = math.sin(ang / 2)
        return (ax * s, ay * s, az * s, math.cos(ang / 2))

    for side in (-1, 1):
        for i in range(whisker_count):
            t = i / (max(1, whisker_count - 1)) if whisker_count > 1 else 0.5
            y = -0.03 + (t - 0.5) * 0.10
            name = f"Whisker_{'L' if side == -1 else 'R'}_{i}"
            yaw = math.radians(side * (28 + (t - 0.5) * 10))
            qz = quat_from_axis_angle(0, 0, 1, math.radians(90))
            qy = quat_from_axis_angle(0, 1, 0, yaw)

            # q = qy*qz
            x1, y1, z1, w1 = qy
            x2, y2, z2, w2 = qz
            q = (
                w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
                w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2,
                w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2,
                w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2,
            )

            whisk_idx = b.add_node(
                name,
                mesh=cyl_mesh,
                translation=[side * 0.18, 0.02 + y, 0.33],
                rotation=[q[0], q[1], q[2], q[3]],
                scale=[0.012, 0.10, 0.012],
            )
            whisk_children.append(whisk_idx)

    whisk_grp_idx = b.add_node("Whiskers", children=whisk_children, translation=[0, 0, 0])

    # Flippers
    flip_scale = [0.16, 0.05, 0.26] if mode != "high" else [0.17, 0.055, 0.28]
    flL_idx = b.add_node("FlipperL", mesh=sphere_mesh, translation=[-0.38, 0.30, -0.02], scale=flip_scale)
    flR_idx = b.add_node("FlipperR", mesh=sphere_mesh, translation=[0.38, 0.30, -0.02], scale=flip_scale)

    tail_idx = b.add_node("Tail", mesh=sphere_mesh, translation=[0, 0.12, -0.48], scale=[0.10, 0.20, 0.32])

    b.json["nodes"][head_idx]["children"] = [earL_idx, earR_idx, eyeL_idx, eyeR_idx, whisk_grp_idx]
    b.json["nodes"][body_idx]["children"] = [back_idx, head_idx, flL_idx, flR_idx, tail_idx]

    root_children = [body_idx]

    if mode == "high" and shell_mesh is not None:
        fur_body_scale = [body_scale[0] * 1.08, body_scale[1] * 1.06, body_scale[2] * 1.08]
        fur_body_idx = b.add_node("FurBody", mesh=shell_mesh, translation=[0, body_y, 0], scale=fur_body_scale)
        fur_back_idx = b.add_node(
            "FurBack",
            mesh=shell_mesh,
            translation=[0, 0.74, -0.08],
            scale=[back_scale[0] * 1.08, back_scale[1] * 1.06, back_scale[2] * 1.08],
        )
        fur_head_idx = b.add_node(
            "FurHead",
            mesh=shell_mesh,
            translation=[0, 0.86, 0.15],
            scale=[head_scale * 1.08] * 3,
        )
        fur_earL_idx = b.add_node(
            "FurEarL",
            mesh=shell_mesh,
            translation=[-0.27, 0.23, 0.00],
            scale=[ear_scale * 1.30, ear_scale * 1.15, ear_scale * 1.30],
        )
        fur_earR_idx = b.add_node(
            "FurEarR",
            mesh=shell_mesh,
            translation=[0.27, 0.23, 0.00],
            scale=[ear_scale * 1.30, ear_scale * 1.15, ear_scale * 1.30],
        )

        b.json["nodes"][fur_head_idx]["children"] = [fur_earL_idx, fur_earR_idx]
        b.json["nodes"][fur_body_idx]["children"] = [fur_back_idx, fur_head_idx]
        fur_grp_idx = b.add_node("fur", children=[fur_body_idx])
        root_children.append(fur_grp_idx)

    b.json["nodes"][root_idx]["children"] = root_children
    b.write(out_path)


def main():
    root = os.path.join(os.path.dirname(__file__), "..")
    out_dir = os.path.join(root, "public", "models", "otter")
    for mode in ("low", "medium", "high"):
        generate_otter_glb(mode, os.path.join(out_dir, f"otter_{mode}.glb"))
        print(f"wrote {mode}")


if __name__ == "__main__":
    main()
