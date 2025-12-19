import type * as THREE from 'three';
import type { OceanUniforms } from './oceanMaterial';

export function applyOceanMaterialShader(
  shader: THREE.WebGLProgramParametersWithUniforms,
  uniforms: OceanUniforms,
  maxWaves: number
): void {
  // Attach uniforms
  shader.uniforms.u_time = uniforms.u_time;
  shader.uniforms.u_origin = uniforms.u_origin;
  shader.uniforms.u_current = uniforms.u_current;
  shader.uniforms.u_tideHeight = uniforms.u_tideHeight;
  shader.uniforms.u_waveA = uniforms.u_waveA;
  shader.uniforms.u_waveB = uniforms.u_waveB;
  shader.uniforms.u_swellIntensity = uniforms.u_swellIntensity;
  shader.uniforms.u_pulseA = uniforms.u_pulseA;
  shader.uniforms.u_pulseB = uniforms.u_pulseB;
  shader.uniforms.u_pulseC = uniforms.u_pulseC;
  shader.uniforms.u_pulseOrigin = uniforms.u_pulseOrigin;
  shader.uniforms.u_foamIntensity = uniforms.u_foamIntensity;
  shader.uniforms.u_foamSlopeStart = uniforms.u_foamSlopeStart;
  shader.uniforms.u_foamSlopeEnd = uniforms.u_foamSlopeEnd;
  shader.uniforms.u_waterClarity = uniforms.u_waterClarity;

  shader.uniforms.u_sunDir = uniforms.u_sunDir;
  shader.uniforms.u_sunColor = uniforms.u_sunColor;
  shader.uniforms.u_sunIntensity = uniforms.u_sunIntensity;

  shader.uniforms.u_reflectionMap = uniforms.u_reflectionMap;
  shader.uniforms.u_reflectionMatrix = uniforms.u_reflectionMatrix;
  shader.uniforms.u_reflectionStrength = uniforms.u_reflectionStrength;

  shader.uniforms.u_reflectionTexel = uniforms.u_reflectionTexel;
  shader.uniforms.u_reflectionBlur = uniforms.u_reflectionBlur;
  shader.uniforms.u_reflectionEdgeFade = uniforms.u_reflectionEdgeFade;

  shader.uniforms.u_foamMap = uniforms.u_foamMap;
  shader.uniforms.u_foamCenter = uniforms.u_foamCenter;
  shader.uniforms.u_foamWorldSize = uniforms.u_foamWorldSize;

  shader.uniforms.u_wind = uniforms.u_wind;
  shader.uniforms.u_microNormal1 = uniforms.u_microNormal1;
  shader.uniforms.u_microNormal2 = uniforms.u_microNormal2;
  shader.uniforms.u_microScale1 = uniforms.u_microScale1;
  shader.uniforms.u_microScale2 = uniforms.u_microScale2;
  shader.uniforms.u_microStrength = uniforms.u_microStrength;
  shader.uniforms.u_microFadeNear = uniforms.u_microFadeNear;
  shader.uniforms.u_microFadeFar = uniforms.u_microFadeFar;
  shader.uniforms.u_capillaryStrength = uniforms.u_capillaryStrength;
  shader.uniforms.u_hasCapillary = uniforms.u_hasCapillary;

  // Add varyings
  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `#include <common>
        varying float vFoam;
        varying vec2 vWorldXZ;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;

        varying vec4 vReflProj;

        uniform float u_time;
        uniform vec2 u_origin;
        uniform vec2 u_current;
        uniform float u_tideHeight;
        uniform mat4 u_reflectionMatrix;
        uniform vec4 u_waveA[${maxWaves}];
        uniform vec4 u_waveB[${maxWaves}];
        uniform float u_swellIntensity;
        uniform vec4 u_pulseA;
        uniform vec4 u_pulseB;
        uniform vec4 u_pulseC;
        uniform vec2 u_pulseOrigin;
        uniform float u_foamSlopeStart;
        uniform float u_foamSlopeEnd;`
  );

  // Inject displacement + normal override after begin_vertex
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `#include <begin_vertex>
        // Ocean Gerstner displacement in object space, driven by world-XZ (origin + local XZ)
        vec2 worldXZ = transformed.xz + u_origin;
        vWorldXZ = worldXZ;

        vec3 disp = vec3(0.0);
        float dxdx = 0.0;
        float dxdz = 0.0;
        float dzdx = 0.0;
        float dzdz = 0.0;
        float dydx = 0.0;
        float dydz = 0.0;
        float fHeight = 0.0;
        float fdxdx = 0.0;
        float fdxdz = 0.0;
        float fdzdx = 0.0;
        float fdzdz = 0.0;
        float fdydx = 0.0;
        float fdydz = 0.0;

        for (int i = 0; i < ${maxWaves}; i++) {
          vec2 dir = normalize(u_waveA[i].xy);
          float A = u_waveA[i].z;
          float k = u_waveA[i].w;
          float omegaRaw = u_waveB[i].x;
          float phase0 = u_waveB[i].y;
          float Q = u_waveB[i].z;
          float bandInfo = u_waveB[i].w;
          float swellTag = step(1.0, bandInfo);
          float crestSharp = fract(bandInfo);

          float seiche = step(0.0, -omegaRaw);
          float omega = abs(omegaRaw);

          float w = omega + k * dot(dir, u_current) * (1.0 - seiche);
          float theta = k * dot(dir, worldXZ) - w * u_time + phase0;

          float s = mix(sin(theta), cos(theta), seiche);
          float c = mix(cos(theta), -sin(theta), seiche);
          float Qeff = Q * (1.0 - seiche);

          float swellScale = mix(1.0, u_swellIntensity, swellTag);
          float A_disp = A * swellScale;

          disp.y += A_disp * s;
          disp.xz += dir * (Qeff * A_disp * c);

          float WAk = Qeff * A_disp * k;

          dxdx += -dir.x * dir.x * WAk * s;
          dxdz += -dir.x * dir.y * WAk * s;
          dzdx += -dir.y * dir.x * WAk * s;
          dzdz += -dir.y * dir.y * WAk * s;

          dydx += A_disp * k * dir.x * c;
          dydz += A_disp * k * dir.y * c;

          float A_foam = A * crestSharp;
          float WAkF = Qeff * A_foam * k;

          fHeight += A_foam * s;

          fdxdx += -dir.x * dir.x * WAkF * s;
          fdxdz += -dir.x * dir.y * WAkF * s;
          fdzdx += -dir.y * dir.x * WAkF * s;
          fdzdz += -dir.y * dir.y * WAkF * s;

          fdydx += A_foam * k * dir.x * c;
          fdydz += A_foam * k * dir.y * c;
        }

        // --- Seismic pulse (long wave packet) ---
        vec2 pDir = u_pulseA.xy;
        float pDirLen = length(pDir);
        pDir = pDirLen > 1e-6 ? (pDir / pDirLen) : vec2(1.0, 0.0);

        float pulseA = u_pulseA.z;
        float pulseK = u_pulseA.w;
        float pulseOmega = u_pulseB.x;
        float pulsePhase = u_pulseB.y;
        float pulseQ = u_pulseB.z;
        float pulseGroup = u_pulseB.w;
        float pulseDecay = max(1e-3, u_pulseC.x);
        float pulseDur = max(u_pulseC.z, 0.0);
        float tPulse = u_time - u_pulseC.y;
        float fade = min(2.5, pulseDur * 0.2);
        fade = min(fade, pulseDur * 0.5);
        fade = max(fade, 1e-4);
        float pulseGate = smoothstep(0.0, fade, tPulse) * (1.0 - smoothstep(pulseDur - fade, pulseDur, tPulse));
        pulseGate *= step(1e-4, pulseDur);

        vec2 pOffset = worldXZ - u_pulseOrigin;
        float sPulse = dot(pDir, pOffset);
        float dist = sPulse - pulseGroup * tPulse;
        float env = exp(-(dist * dist) / (pulseDecay * pulseDecay));
        float A_p = pulseA * env * pulseGate;

        float wPulse = pulseOmega + pulseK * dot(pDir, u_current);
        float thetaPulse = pulseK * sPulse - wPulse * tPulse + pulsePhase;

        float sp = sin(thetaPulse);
        float cp = cos(thetaPulse);

        disp.y += A_p * sp;
        disp.xz += pDir * (pulseQ * A_p * cp);

        float WAkP = pulseQ * A_p * pulseK;

        dxdx += -pDir.x * pDir.x * WAkP * sp;
        dxdz += -pDir.x * pDir.y * WAkP * sp;
        dzdx += -pDir.y * pDir.x * WAkP * sp;
        dzdz += -pDir.y * pDir.y * WAkP * sp;

        dydx += A_p * pulseK * pDir.x * cp;
        dydz += A_p * pulseK * pDir.y * cp;

        transformed.xyz += disp;
        transformed.y += u_tideHeight;

        // Surface normal from analytic partial derivatives (object space)
        vec3 T = vec3(1.0 + dxdx, dydx, dzdx);
        vec3 B = vec3(dxdz, dydz, 1.0 + dzdz);
        vec3 n = normalize(cross(B, T));

        // Override vNormal (view space)
        vNormal = normalize(normalMatrix * n);

        // Also keep world normal + world pos for custom glint/shading
        vWorldNormal = normalize(mat3(modelMatrix) * n);
        vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;

        // World -> reflection UV projection (planar reflection RT)
        vReflProj = u_reflectionMatrix * vec4(vWorldPos, 1.0);

        vec3 Tf = vec3(1.0 + fdxdx, fdydx, fdzdx);
        vec3 Bf = vec3(fdxdz, fdydz, 1.0 + fdzdz);
        vec3 nFoam = normalize(cross(Bf, Tf));

        float slope = 1.0 - nFoam.y;
        float foamSlope = smoothstep(u_foamSlopeStart, u_foamSlopeEnd, slope);
        float foamCrest = smoothstep(0.0, 0.25, fHeight);
        vFoam = foamSlope * foamCrest;`
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `#include <common>
        varying float vFoam;
        varying vec2 vWorldXZ;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;
        varying vec4 vReflProj;

        uniform float u_foamIntensity;
        uniform float u_time;
        uniform vec2 u_current;
        uniform float u_waterClarity;

        uniform sampler2D u_reflectionMap;
        uniform float u_reflectionStrength;
        uniform vec2 u_reflectionTexel;
        uniform float u_reflectionBlur;
        uniform float u_reflectionEdgeFade;

        uniform sampler2D u_foamMap;
        uniform vec2 u_foamCenter;
        uniform float u_foamWorldSize;

        uniform vec2 u_wind;
        uniform sampler2D u_microNormal1;
        uniform sampler2D u_microNormal2;
        uniform float u_microScale1;
        uniform float u_microScale2;
        uniform float u_microStrength;
        uniform float u_microFadeNear;
        uniform float u_microFadeFar;
        uniform float u_capillaryStrength;
        uniform float u_hasCapillary;

        // World normal after micro-normal perturbation (written in normal pass).
        vec3 gWorldNormal;
        float gCapillarySpeckle;

        uniform vec3 u_sunDir;
        uniform vec3 u_sunColor;
        uniform float u_sunIntensity;`
  );

  // Milestone #3: micro normal injection. We perturb the view-space `normal` used by
  // the built-in PBR lighting pipeline, and also write a world-space version to
  // `gWorldNormal` for our custom planar reflection + sunglint logic.
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <normal_fragment_maps>',
    `#include <normal_fragment_maps>
        // --- Micro normals (capillary/wind ripples) ---
        vec3 NmacroW = normalize(vWorldNormal);

        // Wind-aligned coordinate frame (prevents obvious axis-aligned tiling).
        vec2 windV = u_wind;
        float windLen = length(windV);
        vec2 wDir = windLen > 1e-6 ? (windV / windLen) : vec2(1.0, 0.0);
        vec2 wPerp = vec2(-wDir.y, wDir.x);

        // Flow field for micro detail: mostly wind drift, a bit of surface current.
        vec2 flow = u_current * 0.18 + windV * 0.02;
        vec2 wpos = vWorldXZ + flow * u_time;
        vec2 p = vec2(dot(wpos, wDir), dot(wpos, wPerp));

        // Slight anisotropy suggests wind streaking.
        vec2 uv1 = vec2(p.x * u_microScale1 * 1.20, p.y * u_microScale1 * 0.70);
        vec2 uv2 = vec2(p.x * u_microScale2 * 0.85, p.y * u_microScale2 * 1.10) + vec2(31.7, -15.2);

        vec3 n1 = texture2D(u_microNormal1, uv1).xyz * 2.0 - 1.0;
        vec3 n2 = texture2D(u_microNormal2, uv2).xyz * 2.0 - 1.0;

        float capillaryPresent = clamp(u_hasCapillary, 0.0, 1.0);
        vec3 n2Cap = mix(n1, n2, capillaryPresent);

        vec3 Vw = normalize(cameraPosition - vWorldPos);
        float ndvMacro = clamp(dot(NmacroW, Vw), 0.0, 1.0);
        float glancing = smoothstep(0.20, 0.85, 1.0 - ndvMacro);

        float capBoost = clamp(u_capillaryStrength, 0.0, 1.0) * glancing * capillaryPresent;
        float baseMix = 0.55;
        float capMix = clamp(baseMix + (1.0 - baseMix) * capBoost, 0.0, 1.0);

        vec3 nTS = normalize(mix(n1, n2Cap, capMix));

        // Basis around macro normal (world space).
        vec3 up = vec3(0.0, 1.0, 0.0);
        vec3 T = cross(up, NmacroW);
        float t2 = dot(T, T);
        T = (t2 > 1e-8) ? normalize(T) : vec3(1.0, 0.0, 0.0);
        vec3 B = normalize(cross(NmacroW, T));

        vec3 NmicroW = normalize(T * nTS.x + B * nTS.y + NmacroW * nTS.z);

        // Fade micro detail with distance to prevent shimmering.
        float distXZ = length(cameraPosition.xz - vWorldPos.xz);
        float microFade = 1.0 - smoothstep(u_microFadeNear, u_microFadeFar, distXZ);
        float capSpeckle = smoothstep(0.12, 0.45, length(n2Cap.xy));
        gCapillarySpeckle = capSpeckle * capillaryPresent * microFade;
        float microAmt = clamp(u_microStrength, 0.0, 1.0) * microFade;

        // Wave slope-foam dampens micro facets (helps keep sunset highlight stable).
        microAmt *= (1.0 - clamp(vFoam, 0.0, 1.0) * 0.55);

        vec3 NfinalW = normalize(mix(NmacroW, NmicroW, microAmt));
        gWorldNormal = NfinalW;

        // Feed view-space normal back into the PBR lighting pipeline.
        normal = normalize(mat3(viewMatrix) * NfinalW);
        `
  );

  // Water tint / absorption + custom sunset glint.
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <opaque_fragment>',
    `// --- Foam (instantaneous + persistent field) ---
        float foamInstant = clamp(vFoam, 0.0, 1.0);

        vec2 fuv = (vWorldXZ - u_foamCenter) / max(1e-6, u_foamWorldSize) + vec2(0.5);
        float inFoam = step(0.0, fuv.x) * step(0.0, fuv.y) * step(fuv.x, 1.0) * step(fuv.y, 1.0);
        float foamPersist = texture2D(u_foamMap, fuv).r * inFoam;
        foamPersist = pow(clamp(foamPersist, 0.0, 1.0), 1.15);

        float foam = clamp((foamInstant * 0.55 + foamPersist * 1.10) * u_foamIntensity, 0.0, 1.0);
        float capillaryGate = clamp(u_capillaryStrength, 0.0, 1.0) * clamp(u_hasCapillary, 0.0, 1.0);
        vec3 NmacroFoam = normalize(vWorldNormal);
        vec3 Vfoam = normalize(cameraPosition - vWorldPos);
        float ndvFoam = clamp(dot(NmacroFoam, Vfoam), 0.0, 1.0);
        float glancingFoam = smoothstep(0.20, 0.85, 1.0 - ndvFoam);
        float slopeFoam = 1.0 - NmacroFoam.y;
        float slopeGate = smoothstep(0.03, 0.18, slopeFoam);
        float foamSpeckle = gCapillarySpeckle * glancingFoam * slopeGate * capillaryGate;
        foam = clamp(foam + foamSpeckle * 0.35 * (1.0 - foam), 0.0, 1.0);

        // --- Water transmission tint (cheap absorption) ---
        float viewDist = length(vViewPosition);
        float absorb = mix(0.00052, 0.00018, clamp(u_waterClarity, 0.0, 1.0));
        float att = exp(-absorb * viewDist);
        vec3 deep = vec3(0.02, 0.10, 0.18);
        vec3 green = vec3(0.02, 0.19, 0.17);
        vec3 tint = mix(green, deep, clamp(u_waterClarity, 0.0, 1.0));
        outgoingLight = mix(tint, outgoingLight, clamp(0.50 + 0.50 * att, 0.0, 1.0));

        // --- Planar reflection (stable horizon/sky/objects) ---
        // Use the *macro* normal for the reflection UV distortion so it stays stable.
        vec3 Nmacro = normalize(vWorldNormal);
        // Use the micro-perturbed normal for small-facet sunglint.
        vec3 N = normalize(gWorldNormal);

        vec3 V = normalize(cameraPosition - vWorldPos);
        float ndvRaw = dot(Nmacro, V);
        float viewAbove = step(0.0, ndvRaw);
        float ndv = max(ndvRaw, 0.0);

        vec2 ruv = vReflProj.xy / max(vReflProj.w, 1e-6);
        // Subtle distortion from macro wave normal (kept small to avoid shimmer).
        ruv += Nmacro.xz * (0.03 + 0.02 * (1.0 - clamp(u_waterClarity, 0.0, 1.0))) * (1.0 - foam * 0.75);

        // Soft edge fade to prevent hard popping when the proj rect clips.
        float e = max(u_reflectionEdgeFade, 0.0001);
        float inBounds =
          smoothstep(0.0, e, ruv.x) * smoothstep(0.0, e, ruv.y) *
          (1.0 - smoothstep(1.0 - e, 1.0, ruv.x)) *
          (1.0 - smoothstep(1.0 - e, 1.0, ruv.y));

        vec3 reflCol = texture2D(u_reflectionMap, ruv).rgb;
        // Roughness-aware blur fallback (cheap 5-tap). Only enabled on High/Max.
        if (u_reflectionBlur > 0.001) {
          vec2 off = u_reflectionTexel * u_reflectionBlur;
          vec3 s1 = texture2D(u_reflectionMap, ruv + vec2(off.x, 0.0)).rgb;
          vec3 s2 = texture2D(u_reflectionMap, ruv - vec2(off.x, 0.0)).rgb;
          vec3 s3 = texture2D(u_reflectionMap, ruv + vec2(0.0, off.y)).rgb;
          vec3 s4 = texture2D(u_reflectionMap, ruv - vec2(0.0, off.y)).rgb;
          reflCol = reflCol * 0.40 + (s1 + s2 + s3 + s4) * 0.15;
        }

        // Water Fresnel (Schlick, F0 ~ 0.02 for IOR~1.33)
        float F0 = 0.020;
        float fresW = F0 + (1.0 - F0) * pow(1.0 - ndv, 5.0);

        float reflAmt = clamp(u_reflectionStrength, 0.0, 1.25) * fresW;
        reflAmt *= inBounds * viewAbove;
        // Foam kills coherent mirror reflection.
        reflAmt *= (1.0 - foam * 0.88);

        // Fresnel mix: grazing -> reflection dominates.
        outgoingLight = mix(outgoingLight, reflCol, clamp(reflAmt, 0.0, 1.0));

        // --- Foam (whitens crests) ---
        outgoingLight = mix(outgoingLight, vec3(1.0), foam * 0.95);

        // --- Sunset sunglint path (highlight spice) ---
        vec3 L = normalize(u_sunDir);

        // Use micro normals only partially so the "golden path" stays coherent.
        vec3 Ngl = normalize(mix(Nmacro, N, 0.85));

        vec3 R = reflect(-L, Ngl);
        float rv = max(dot(R, V), 0.0);

        float fres = pow(1.0 - ndv, 5.0);

        // Sharper when sun is low on the horizon
        float sunLow = clamp(1.0 - abs(L.y) * 2.2, 0.0, 1.0);
        float gloss = mix(180.0, 720.0, sunLow);
        float spec = pow(rv, gloss);

        // Foam reduces mirror glint
        spec *= mix(1.0, 0.30, foam);

        // Reduce glint slightly when planar reflection is already strong.
        float glintGate = mix(1.0, 0.55, clamp(reflAmt, 0.0, 1.0));

        // Final glint contribution
        vec3 sunCol = u_sunColor;
        outgoingLight += sunCol * (u_sunIntensity * 1.15) * spec * (0.30 + 0.70 * fres) * glintGate * viewAbove;

        // --- Underside surface glow (when the camera is underwater) ---
        // We don't attempt true refraction here (too heavy for mobile), but we do
        // add a physically-plausible "sun patch" and grazing sheen so the surface
        // reads correctly from below.
        float viewBelow = 1.0 - viewAbove;
        if (viewBelow > 0.5) {
          // Spec-like hotspot from the sun reflection direction.
          float rvUnder = max(dot(R, V), 0.0);
          float glossUnder = mix(120.0, 220.0, sunLow);
          float specUnder = pow(rvUnder, glossUnder);

          // A broader forward-scatter-ish glow when looking up.
          float upGlow = pow(max(dot(Nmacro, L), 0.0), 10.0);

          float underAmt = (specUnder * 0.55 + upGlow * 0.18) * u_sunIntensity;
          // Foam kills coherent highlights even from below.
          underAmt *= mix(1.0, 0.35, foam);

          // Slightly water-filtered (less saturated) sun color.
          vec3 sunW = mix(vec3(0.12, 0.24, 0.30), sunCol, 0.72);
          outgoingLight += sunW * underAmt;

          // Grazing sheen from below (total internal reflection vibe).
          float ndvUnder = clamp(-ndvRaw, 0.0, 1.0);
          float fresUnder = F0 + (1.0 - F0) * pow(1.0 - ndvUnder, 5.0);
          outgoingLight += sunW * fresUnder * u_sunIntensity * 0.08 * (1.0 - foam * 0.7);
        }

        #include <opaque_fragment>`
  );
}
