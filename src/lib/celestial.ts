import { clamp, degToRad, smoothstep } from './math';

export interface SkyInputs {
  latitude_deg: number;
  dayOfYear: number;   // 1..365
  timeOfDay_h: number; // 0..24

  // Moon
  moonPhase: number; // 0..1 (0 new, 0.5 full)
  moonDistanceMultiplier: number; // relative to mean distance (1 = mean)
}

export interface CelestialState {
  sunDir: [number, number, number];   // unit vector pointing *toward* sun
  moonDir: [number, number, number];  // unit vector pointing *toward* moon
  sunElevation_rad: number;
  moonElevation_rad: number;

  sunIntensity: number;  // 0.. ~1
  moonIntensity: number; // 0.. ~1

  // Tide scaling ~ 1/r^3
  tideScale: number;
}

/** Approx solar declination (radians). */
function solarDeclination(dayOfYear: number): number {
  const d = clamp(dayOfYear, 1, 365);
  const gamma = (2 * Math.PI * (d - 81)) / 365;
  return degToRad(23.44) * Math.sin(gamma);
}

/** Compute altitude and azimuth (azimuth from north, east-positive). */
function altAz(latitudeRad: number, declinationRad: number, hourAngleRad: number): { alt: number; az: number } {
  const sinLat = Math.sin(latitudeRad);
  const cosLat = Math.cos(latitudeRad);
  const sinDec = Math.sin(declinationRad);
  const cosDec = Math.cos(declinationRad);
  const cosH = Math.cos(hourAngleRad);
  const sinH = Math.sin(hourAngleRad);

  const sinAlt = sinLat * sinDec + cosLat * cosDec * cosH;
  const alt = Math.asin(clamp(sinAlt, -1, 1));

  // azimuth
  const cosAlt = Math.max(1e-6, Math.cos(alt));
  const sinAz = (-sinH * cosDec) / cosAlt;
  const cosAz = (sinDec - Math.sin(alt) * sinLat) / (cosAlt * cosLat + 1e-6);
  const az = Math.atan2(sinAz, cosAz);
  return { alt, az };
}

function dirFromAltAz(alt: number, az: number): [number, number, number] {
  // world: x east, y up, z north
  const cosAlt = Math.cos(alt);
  const x = cosAlt * Math.sin(az);
  const y = Math.sin(alt);
  const z = cosAlt * Math.cos(az);
  return [x, y, z];
}

export function computeCelestials(inp: SkyInputs): CelestialState {
  const lat = degToRad(clamp(inp.latitude_deg, -89.9, 89.9));
  const declSun = solarDeclination(inp.dayOfYear);

  const time = ((inp.timeOfDay_h % 24) + 24) % 24;
  const hourAngle = degToRad((time - 12) * 15); // radians

  const sun = altAz(lat, declSun, hourAngle);
  const sunDir = dirFromAltAz(sun.alt, sun.az);

  // Moon: crude but plausible daily motion. Phase controls separation from sun.
  const phase = ((inp.moonPhase % 1) + 1) % 1;
  const moonHourAngle = hourAngle + phase * 2 * Math.PI;
  const declMoon = declSun * 0.6; // small declination coupling (rough)
  const moon = altAz(lat, declMoon, moonHourAngle);
  const moonDir = dirFromAltAz(moon.alt, moon.az);

  // Intensities: fade in/out around horizon.
  const sunIntensity = smoothstep(-0.02, 0.15, sun.alt);   // brighter when higher
  const moonIntensity = smoothstep(-0.05, 0.08, moon.alt) * (1 - sunIntensity * 0.85);

  const distMult = clamp(inp.moonDistanceMultiplier, 0.5, 2.0);
  const tideScale = 1 / (distMult * distMult * distMult); // ∝ 1/r^3

  return {
    sunDir,
    moonDir,
    sunElevation_rad: sun.alt,
    moonElevation_rad: moon.alt,
    sunIntensity,
    moonIntensity,
    tideScale
  };
}
