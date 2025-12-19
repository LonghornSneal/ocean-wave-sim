import * as THREE from 'three';

/**
 * Simple silhouetted islands on the horizon to help sell scale and match the sunset reference.
 * These are intentionally lightweight and "cheat" by following the camera so they never drift away.
 */
export class HorizonIslands {
  public readonly group: THREE.Group = new THREE.Group();

  private readonly tmpFwd = new THREE.Vector3();
  private readonly tmpLeft = new THREE.Vector3();

  private readonly islands: THREE.Mesh[] = [];
  private readonly layout: Array<{ dist: number; side: number; scale: THREE.Vector3; y: number }> = [];

  constructor() {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#14131b'),
      roughness: 1.0,
      metalness: 0.0,
      emissive: new THREE.Color('#050509'),
      emissiveIntensity: 0.2
    });

    // Left small island
    const i0 = this.makeIsland(mat, 420, 22);
    this.islands.push(i0);
    this.layout.push({ dist: 5200, side: -2600, scale: new THREE.Vector3(1.2, 1.0, 0.8), y: -6 });

    // Center distant low ridge
    const i1 = this.makeIsland(mat, 680, 26);
    this.islands.push(i1);
    this.layout.push({ dist: 6100, side: 0, scale: new THREE.Vector3(2.6, 0.75, 0.8), y: -9 });

    // Right long island (reference-like)
    const i2 = this.makeIsland(mat, 760, 28);
    this.islands.push(i2);
    this.layout.push({ dist: 5600, side: 2700, scale: new THREE.Vector3(3.0, 0.85, 0.9), y: -8 });

    for (const m of this.islands) {
      m.castShadow = false;
      m.receiveShadow = false;
      this.group.add(m);
    }

    this.group.frustumCulled = false;
  }

  /**
   * Update island placement so they stay near the horizon in front of the camera.
   * @param center The camera position.
   * @param forward The camera forward/look direction (world).
   * @param seaLevelY Approx sea level (tide).
   */
  public update(center: THREE.Vector3, forward: THREE.Vector3, seaLevelY: number): void {
    const fwd = this.tmpFwd.copy(forward);
    fwd.y = 0;
    if (fwd.lengthSq() < 1e-6) fwd.set(0, 0, -1);
    fwd.normalize();

    // Left vector
    this.tmpLeft.set(0, 1, 0).cross(fwd).normalize();

    for (let i = 0; i < this.islands.length; i++) {
      const m = this.islands[i];
      const L = this.layout[i];

      m.position.set(
        center.x + fwd.x * L.dist + this.tmpLeft.x * L.side,
        seaLevelY + L.y,
        center.z + fwd.z * L.dist + this.tmpLeft.z * L.side
      );
      m.scale.copy(L.scale);
    }
  }

  private makeIsland(mat: THREE.Material, radius: number, segs: number): THREE.Mesh {
    // Start from a low cylinder and roughen the top edge
    const geo = new THREE.CylinderGeometry(radius * 0.95, radius, 70, segs, 2, false);
    const pos = geo.getAttribute('position') as THREE.BufferAttribute;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.set(pos.getX(i), pos.getY(i), pos.getZ(i));

      // Only roughen near the top
      const top = (v.y > 10) ? 1 : 0;
      if (top) {
        const n = Math.sin(v.x * 0.004 + v.z * 0.006) + Math.cos(v.z * 0.005 - v.x * 0.003);
        const ridge = Math.sin((v.x + v.z) * 0.002) * 0.7 + 0.3;
        v.y += (n * 8 + ridge * 10) * 0.6;
        v.x += Math.sin(v.z * 0.008) * 6.0;
        v.z += Math.cos(v.x * 0.008) * 6.0;
      }

      pos.setXYZ(i, v.x, v.y, v.z);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();

    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
  }
}
