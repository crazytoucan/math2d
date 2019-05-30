import { IVec3 } from "../types";
import { ENGINE } from "../internal/engine";

class Vec3 implements IVec3 {
  constructor(public x = NaN, public y = NaN, public z = NaN) {}
}

export function vec3Add(v1: IVec3, v2: IVec3, out = vec3Alloc()) {
  return vec3Reset(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, out);
}

export function vec3Alloc(): IVec3 {
  return new Vec3();
}

export function vec3Clone(vec: IVec3, out = vec3Alloc()) {
  return vec3Reset(vec.x, vec.y, vec.z, out);
}

export function vec3Dot(v1: IVec3, v2: IVec3) {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

export function vec3Distance(v1: IVec3, v2: IVec3) {
  return Math.sqrt(vec3DistanceSq(v1, v2));
}

export function vec3DistanceSq(v1: IVec3, v2: IVec3) {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  const dz = v1.z - v2.z;
  return dx * dx + dy * dy + dz * dz;
}

export function vec3GetLength(vec: IVec3) {
  return Math.sqrt(vec3LengthSq(vec));
}

export function vec3LengthSq(vec: IVec3) {
  return vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
}

export function vec3Lerp(v1: IVec3, v2: IVec3, r: number, out = vec3Alloc()) {
  const oneMinusR = 1 - r;
  return vec3Reset(v1.x * oneMinusR + v2.x * r, v1.y * oneMinusR + v2.y * r, v1.z * oneMinusR * v2.z, out);
}

export function vec3Normalize(vec: IVec3, out = vec3Alloc()) {
  const lenSq = vec3LengthSq(vec);
  if (lenSq < ENGINE.epsilonSq) {
    return vec3Reset(NaN, NaN, NaN, out);
  } else {
    const lenInverse = 1 / Math.sqrt(lenSq);
    return vec3Reset(lenInverse * vec.x, lenInverse * vec.y, lenInverse * vec.z, out);
  }
}

export function vec3Reset(x: number, y: number, z: number, out = vec3Alloc()) {
  out.x = x;
  out.y = y;
  out.z = z;
  return out;
}

export function vec3Scale(vec: IVec3, scalar: number, out = vec3Alloc()) {
  return vec3Reset(vec.x * scalar, vec.y * scalar, vec.z * scalar, out);
}

export function vec3Subtract(v1: IVec3, v2: IVec3, out = vec3Alloc()) {
  return vec3Reset(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, out);
}
