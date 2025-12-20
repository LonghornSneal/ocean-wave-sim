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
  shader.uniforms.u_lodFadeNear = uniforms.u_lodFadeNear;
  shader.uniforms.u_lodFadeFar = uniforms.u_lodFadeFar;
  shader.uniforms.u_lodKLow = uniforms.u_lodKLow;
  shader.uniforms.u_lodKHigh = uniforms.u_lodKHigh;
  shader.uniforms.u_lodLowBoost = uniforms.u_lodLowBoost;
  shader.uniforms.u_pulseA = uniforms.u_pulseA;
  shader.uniforms.u_pulseB = uniforms.u_pulseB;
  shader.uniforms.u_pulseC = uniforms.u_pulseC;
  shader.uniforms.u_pulseOrigin = uniforms.u_pulseOrigin;
  shader.uniforms.u_foamIntensity = uniforms.u_foamIntensity;
  shader.uniforms.u_foamSlopeStart = uniforms.u_foamSlopeStart;
  shader.uniforms.u_foamSlopeEnd = uniforms.u_foamSlopeEnd;
  shader.uniforms.u_waterClarity = uniforms.u_waterClarity;
  shader.uniforms.u_surfaceRoughness = uniforms.u_surfaceRoughness;
  shader.uniforms.u_waterDepth = uniforms.u_waterDepth;
  shader.uniforms.u_absorptionColor = uniforms.u_absorptionColor;
  shader.uniforms.u_absorptionDistance = uniforms.u_absorptionDistance;

  shader.uniforms.u_sunDir = uniforms.u_sunDir;
  shader.uniforms.u_sunColor = uniforms.u_sunColor;
  shader.uniforms.u_sunIntensity = uniforms.u_sunIntensity;
  shader.uniforms.u_lightningDir = uniforms.u_lightningDir;
  shader.uniforms.u_lightningColor = uniforms.u_lightningColor;
  shader.uniforms.u_lightningIntensity = uniforms.u_lightningIntensity;

  shader.uniforms.u_reflectionMap = uniforms.u_reflectionMap;
  shader.uniforms.u_reflectionMatrix = uniforms.u_reflectionMatrix;
  shader.uniforms.u_reflectionStrength = uniforms.u_reflectionStrength;

  shader.uniforms.u_reflectionTexel = uniforms.u_reflectionTexel;
  shader.uniforms.u_reflectionBlur = uniforms.u_reflectionBlur;
  shader.uniforms.u_reflectionEdgeFade = uniforms.u_reflectionEdgeFade;

  shader.uniforms.u_ssrMap = uniforms.u_ssrMap;
  shader.uniforms.u_ssrTexel = uniforms.u_ssrTexel;
  shader.uniforms.u_ssrStrength = uniforms.u_ssrStrength;

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
        uniform float u_lodFadeNear;
        uniform float u_lodFadeFar;
        uniform float u_lodKLow;
        uniform float u_lodKHigh;
        uniform float u_lodLowBoost;
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

        float lodDist = length(transformed.xz);
        float lodT = smoothstep(u_lodFadeNear, u_lodFadeFar, lodDist);

        vec3 disp = vec3(0.0);
        float dxdx = 0.0;
        float dxdz = 0.0;
        float dzdx = 0.0;
        float dzdz = 0.0;
        float dydx = 0.0;
        float dydz = 0.0;
        float fCurv = 0.0;
        float fCurvAmp = 0.0;
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
          float kFade = smoothstep(u_lodKLow, u_lodKHigh, k);
          float lodAtten = 1.0 - lodT * kFade;
          float lodBoost = 1.0 + (u_lodLowBoost - 1.0) * (1.0 - kFade) * lodT;
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
          float A_disp = A * swellScale * lodAtten * lodBoost;

          disp.y += A_disp * s;
          disp.xz += dir * (Qeff * A_disp * c);

          float WAk = Qeff * A_disp * k;

          dxdx += -dir.x * dir.x * WAk * s;
          dxdz += -dir.x * dir.y * WAk * s;
          dzdx += -dir.y * dir.x * WAk * s;
          dzdz += -dir.y * dir.y * WAk * s;

          dydx += A_disp * k * dir.x * c;
          dydz += A_disp * k * dir.y * c;

          float A_foam = A * crestSharp * lodAtten;
          float WAkF = Qeff * A_foam * k;

          float k2 = k * k;
          fCurv += -A_foam * k2 * s;
          fCurvAmp += A_foam * k2;

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
        float curv = clamp(-fCurv / max(1e-4, fCurvAmp), 0.0, 1.0);
        float foamCurv = smoothstep(0.20, 0.65, curv);
        vFoam = foamSlope * foamCurv;`
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
        uniform float u_surfaceRoughness;
        uniform float u_waterDepth;
        uniform vec3 u_absorptionColor;
        uniform float u_absorptionDistance;

        uniform sampler2D u_reflectionMap;
        uniform float u_reflectionStrength;
        uniform vec2 u_reflectionTexel;
        uniform float u_reflectionBlur;
        uniform float u_reflectionEdgeFade;

        uniform sampler2D u_ssrMap;
        uniform vec2 u_ssrTexel;
        uniform float u_ssrStrength;

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
        float gFoamNoise;
        float gDistXZ;

        uniform vec3 u_sunDir;
        uniform vec3 u_sunColor;
        uniform float u_sunIntensity;
        uniform vec3 u_lightningDir;
        uniform vec3 u_lightningColor;
        uniform float u_lightningIntensity;

        vec4 sampleReflectionBlur(sampler2D tex, vec2 uv, vec2 texel, float radius) {
          vec4 c = texture2D(tex, uv);
          if (radius <= 0.001) return c;
          vec2 off = texel * radius;
          vec4 s1 = texture2D(tex, uv + vec2(off.x, 0.0));
          vec4 s2 = texture2D(tex, uv - vec2(off.x, 0.0));
          vec4 s3 = texture2D(tex, uv + vec2(0.0, off.y));
          vec4 s4 = texture2D(tex, uv - vec2(0.0, off.y));
          float w0 = c.a * 0.40;
          float w1 = s1.a * 0.15;
          float w2 = s2.a * 0.15;
          float w3 = s3.a * 0.15;
          float w4 = s4.a * 0.15;
          float w = w0 + w1 + w2 + w3 + w4;
          vec3 rgb = (c.rgb * w0 + s1.rgb * w1 + s2.rgb * w2 + s3.rgb * w3 + s4.rgb * w4) / max(w, 1e-4);
          return vec4(rgb, clamp(w, 0.0, 1.0));
        }`
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

        vec2 foamPos = vWorldXZ + flow * (u_time * 2.6);
        vec2 fp = vec2(dot(foamPos, wDir), dot(foamPos, wPerp));
        vec2 fuv1 = vec2(fp.x * u_microScale1 * 0.16, fp.y * u_microScale1 * 0.08);
        vec2 fuv2 = vec2(fp.x * u_microScale2 * 0.10, fp.y * u_microScale2 * 0.14) + vec2(23.4, -12.7);
        float foamN1 = texture2D(u_microNormal1, fuv1).x;
        float foamN2 = texture2D(u_microNormal2, fuv2).y;
        float foamNoiseRaw = mix(foamN1, foamN2, 0.55);
        gFoamNoise = smoothstep(0.20, 0.85, foamNoiseRaw);

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

        // Build a tangent frame aligned to wind direction (projected onto the surface).
        vec3 wDir3 = normalize(vec3(wDir.x, 0.0, wDir.y));
        vec3 T = wDir3 - NmacroW * dot(wDir3, NmacroW);
        float t2 = dot(T, T);
        T = (t2 > 1e-8) ? normalize(T) : normalize(cross(vec3(0.0, 1.0, 0.0), NmacroW));
        vec3 B = normalize(cross(NmacroW, T));

        // Fade micro detail with distance to prevent shimmering.
        float distXZ = length(cameraPosition.xz - vWorldPos.xz);
        gDistXZ = distXZ;
        float microFade = 1.0 - smoothstep(u_microFadeNear, u_microFadeFar, distXZ);
        float capSpeckle = smoothstep(0.12, 0.45, length(n2Cap.xy));
        gCapillarySpeckle = capSpeckle * capillaryPresent * microFade;
        float microAmt = clamp(u_microStrength, 0.0, 1.0) * microFade;

        // Wave slope-foam dampens micro facets (helps keep sunset highlight stable).
        microAmt *= (1.0 - clamp(vFoam, 0.0, 1.0) * 0.55);

        // Blend micro normals in tangent space, then reproject to world.
        vec3 nBlend = normalize(mix(vec3(0.0, 0.0, 1.0), nTS, microAmt));
        vec3 NfinalW = normalize(T * nBlend.x + B * nBlend.y + NmacroW * nBlend.z);
        gWorldNormal = NfinalW;

        // Feed view-space normal back into the PBR lighting pipeline.
        normal = normalize(mat3(viewMatrix) * NfinalW);
        `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <roughnessmap_fragment>',
    `#include <roughnessmap_fragment>
        // Per-pixel roughness boost from wave slope + curvature.
        vec3 NmacroR = normalize(vWorldNormal);
        float slope = clamp(1.0 - NmacroR.y, 0.0, 1.0);
        vec3 dNdx = dFdx(NmacroR);
        vec3 dNdy = dFdy(NmacroR);
        float curvature = clamp(length(dNdx) + length(dNdy), 0.0, 1.0);

        float slopeBoost = smoothstep(0.06, 0.30, slope);
        float curveBoost = smoothstep(0.02, 0.14, curvature);
        float crestBoost = smoothstep(0.10, 0.55, clamp(vFoam, 0.0, 1.0));

        float roughBoost = (0.18 * slopeBoost + 0.26 * curveBoost) * (0.8 + 0.2 * crestBoost);
        roughnessFactor = clamp(roughnessFactor + roughBoost, 0.0, 1.0);`
  );

  // Water tint / absorption + custom sunset glint.
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <opaque_fragment>',
    `// --- Foam (instantaneous + persistent field) ---
        float foamInstant = clamp(vFoam, 0.0, 1.0);
        float foamNoise = clamp(gFoamNoise, 0.0, 1.0);
        float foamBreakup = mix(0.40, 1.0, foamNoise);
        float foamPhase = fract(u_time * 0.35 + foamNoise * 1.7 + dot(vWorldXZ, vec2(0.015, 0.011)));
        float foamDecay = mix(0.35, 1.0, exp(-foamPhase * 3.0));
        foamInstant *= foamBreakup * foamDecay;

        vec2 fuv = (vWorldXZ - u_foamCenter) / max(1e-6, u_foamWorldSize) + vec2(0.5);
        float inFoam = step(0.0, fuv.x) * step(0.0, fuv.y) * step(fuv.x, 1.0) * step(fuv.y, 1.0);
        float foamPersist = texture2D(u_foamMap, fuv).r * inFoam;
        foamPersist = pow(clamp(foamPersist, 0.0, 1.0), 1.15);
        foamPersist *= mix(0.55, 1.0, foamNoise);

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
        float foamFadeNear = u_foamWorldSize * 0.60;
        float foamFadeFar = u_foamWorldSize * 2.80;
        float foamFade = 1.0 - smoothstep(foamFadeNear, foamFadeFar, gDistXZ);
        foam *= foamFade;

        // --- Water transmission tint (depth-based absorption + scattering) ---
        vec3 Nmacro = normalize(vWorldNormal);
        // Use the micro-perturbed normal for small-facet sunglint.
        vec3 N = normalize(gWorldNormal);

        vec3 V = normalize(cameraPosition - vWorldPos);
        float ndvRaw = dot(Nmacro, V);
        float viewAbove = step(0.0, ndvRaw);
        float ndv = clamp(ndvRaw, 0.0, 1.0);
        float ndvAbs = max(abs(ndvRaw), 0.06);

        float clarity = clamp(u_waterClarity, 0.0, 1.0);
        float waterDepth = max(0.0, u_waterDepth + vWorldPos.y);
        float pathLen = waterDepth / ndvAbs;

        float depthScale = mix(0.45, 1.35, clarity);
        float absorptionDist = max(0.5, u_absorptionDistance * depthScale);
        vec3 absorptionColor = clamp(u_absorptionColor, vec3(0.02), vec3(0.98));
        vec3 absorptionCoeff = -log(absorptionColor) / absorptionDist;
        vec3 transmittance = exp(-absorptionCoeff * pathLen);

        float scatterStrength = mix(0.65, 0.30, clarity);
        vec3 scatterTint = mix(absorptionColor, vec3(1.0), 0.12);
        vec3 scatterCol = scatterTint * (1.0 - transmittance) * scatterStrength;

        outgoingLight = outgoingLight * transmittance + scatterCol;

        // Normal variance drives reflection breakup + glint stretch.
        float slopeRefl = clamp(1.0 - Nmacro.y, 0.0, 1.0);
        vec3 dNdxRefl = dFdx(Nmacro);
        vec3 dNdyRefl = dFdy(Nmacro);
        float macroVar = clamp(length(dNdxRefl) + length(dNdyRefl), 0.0, 1.0);
        float microVar = clamp(1.0 - dot(Nmacro, N), 0.0, 1.0);
        float normalVar = clamp(macroVar * 0.75 + microVar * 0.55, 0.0, 1.0);
        float roughBase = clamp(u_surfaceRoughness, 0.02, 0.6);
        float roughWave = clamp(roughBase + slopeRefl * 0.10, 0.02, 0.7);
        float roughAA = clamp(sqrt(roughWave * roughWave + normalVar * 0.08), 0.02, 1.0);
        float waveBreak = smoothstep(0.08, 0.45, normalVar + slopeRefl * 0.25);
        vec3 Ngl = normalize(mix(Nmacro, N, 0.85));

        // --- Planar reflection (stable horizon/sky/objects) ---
        // Use the *macro* normal for the reflection UV distortion so it stays stable.

        vec2 ruv = vReflProj.xy / max(vReflProj.w, 1e-6);
        // Subtle distortion from macro wave normal (kept small to avoid shimmer).
        ruv += Nmacro.xz * (0.03 + 0.02 * (1.0 - clamp(u_waterClarity, 0.0, 1.0))) * (1.0 - foam * 0.75);

        // Soft edge fade to prevent hard popping when the proj rect clips.
        float e = max(u_reflectionEdgeFade, 0.0001);
        float inBounds =
          smoothstep(0.0, e, ruv.x) * smoothstep(0.0, e, ruv.y) *
          (1.0 - smoothstep(1.0 - e, 1.0, ruv.x)) *
          (1.0 - smoothstep(1.0 - e, 1.0, ruv.y));

        float viewBlur = smoothstep(0.0, 0.85, ndv);
        float reflBlur = u_reflectionBlur * (0.35 + 1.25 * roughAA) * mix(0.45, 1.0, viewBlur);

        vec4 reflSample = sampleReflectionBlur(u_reflectionMap, ruv, u_reflectionTexel, reflBlur);
        vec3 reflCol = reflSample.rgb;

        float ssrMask = 0.0;
        if (u_ssrStrength > 0.001) {
          vec2 suv = gl_FragCoord.xy * u_ssrTexel;
          float ssrScale = u_reflectionTexel.x / max(u_ssrTexel.x, 1e-6);
          vec4 ssrSample = sampleReflectionBlur(u_ssrMap, suv, u_ssrTexel, reflBlur * ssrScale);
          float ssrFade = 1.0 - smoothstep(120.0, 420.0, gDistXZ);
          float ssrRoughGate = 1.0 - smoothstep(0.35, 0.75, roughAA);
          ssrMask = clamp(ssrSample.a * u_ssrStrength * ssrFade * ssrRoughGate, 0.0, 1.0);
          reflCol = mix(reflCol, ssrSample.rgb, ssrMask);
        }

        // Water Fresnel (Schlick, IOR ~1.33)
        float eta = 1.333;
        float F0 = pow((eta - 1.0) / (eta + 1.0), 2.0);
        float fresnel = F0 + (1.0 - F0) * pow(1.0 - ndv, 5.0);

        float reflStrength = clamp(u_reflectionStrength, 0.0, 1.25);
        float reflAmt = reflStrength * fresnel;
        reflAmt *= max(inBounds, ssrMask) * viewAbove;
        // Foam kills coherent mirror reflection.
        reflAmt *= (1.0 - foam * 0.88);
        reflAmt *= mix(1.0, 0.65, waveBreak);
        reflAmt = clamp(reflAmt, 0.0, 1.0);

        // Energy-conserving mix: stronger spec reduces transmitted energy.
        outgoingLight *= (1.0 - reflAmt);
        outgoingLight += reflCol * reflAmt;

        // --- Foam (whitens crests) ---
        outgoingLight = mix(outgoingLight, vec3(1.0), foam * 0.95);

        // --- Sunset sunglint path (highlight spice) ---
        vec3 L = normalize(u_sunDir);
        vec3 H = normalize(L + V);
        float ndl = max(dot(Ngl, L), 0.0);
        float ndvGl = max(dot(Ngl, V), 0.0);
        float ndh = max(dot(Ngl, H), 0.0);
        float vdh = max(dot(V, H), 0.0);

        float fres = fresnel;

        // Sharper when sun is low on the horizon
        float sunLow = clamp(1.0 - abs(L.y) * 2.2, 0.0, 1.0);
        float roughGlint = clamp(roughAA * mix(0.85, 0.45, sunLow), 0.02, 0.6);

        float alpha = max(roughGlint * roughGlint, 0.0015);
        float alpha2 = alpha * alpha;
        float denom = ndh * ndh * (alpha2 - 1.0) + 1.0;
        float D = alpha2 * RECIPROCAL_PI / (denom * denom);

        float k = (roughGlint + 1.0);
        k = (k * k) * 0.125;
        float Gv = ndvGl / (ndvGl * (1.0 - k) + k);
        float Gl = ndl / (ndl * (1.0 - k) + k);
        float G = Gv * Gl;

        float F = F0 + (1.0 - F0) * pow(1.0 - vdh, 5.0);
        float spec = (D * G * F) / max(4.0 * ndvGl * ndl, 1e-4);
        spec *= ndl;
        spec *= mix(1.0, 0.75, waveBreak);

        vec3 R = reflect(-L, Ngl);

        // Foam reduces mirror glint
        spec *= mix(1.0, 0.30, foam);

        // Reduce glint slightly when planar reflection is already strong.
        float glintGate = mix(1.0, 0.55, reflAmt);

        // Final glint contribution
        vec3 sunCol = u_sunColor;
        outgoingLight += sunCol * (u_sunIntensity * 1.15) * spec * (0.30 + 0.70 * fres) * glintGate * viewAbove;

        // --- Lightning specular spike ---
        float flash = clamp(u_lightningIntensity, 0.0, 1.0);
        if (flash > 0.0001) {
          vec3 Lflash = normalize(u_lightningDir);
          vec3 Nflash = normalize(mix(Nmacro, N, 0.92));
          vec3 Rflash = reflect(-Lflash, Nflash);
          float rvFlash = max(dot(Rflash, V), 0.0);
          float flashSharp = clamp(flash * flash, 0.0, 1.0);
          float glossFlash = mix(220.0, 980.0, flashSharp);
          float specFlash = pow(rvFlash, glossFlash);
          specFlash *= (0.35 + 0.65 * fres);
          specFlash *= mix(1.0, 0.28, foam);
          specFlash *= mix(1.0, 0.7, waveBreak);
          specFlash *= viewAbove;
          outgoingLight += u_lightningColor * specFlash * (1.2 * flash);
        }

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
