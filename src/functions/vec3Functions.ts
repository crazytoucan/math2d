import { IVec3 } from "../types";
import { ENGINE } from "../internal/engine";

class Vec3 implements IVec3 {
  constructor(public x = NaN, public y = NaN, public z = NaN) {}
}

export function vec3Add(a: IVec3, b: IVec3, out = vec3Alloc()) {
  return vec3Reset(a.x + b.x, a.y + b.y, a.z + b.z, out);
}

export function vec3Alloc(): IVec3 {
  return new Vec3();
}

export function vec3Clone(vec: IVec3, out = vec3Alloc()) {
  return vec3Reset(vec.x, vec.y, vec.z, out);
}

export function vec3Dot(a: IVec3, b: IVec3) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function vec3Distance(a: IVec3, b: IVec3) {
  return Math.sqrt(vec3DistanceSq(a, b));
}

export function vec3DistanceSq(a: IVec3, b: IVec3) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}

export function vec3GetLength(vec: IVec3) {
  return Math.sqrt(vec3GetLengthSq(vec));
}

export function vec3GetLengthSq(vec: IVec3) {
  return vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
}

export function vec3Lerp(a: IVec3, b: IVec3, r: number, out = vec3Alloc()) {
  const oneMinusR = 1 - r;
  return vec3Reset(a.x * oneMinusR + b.x * r, a.y * oneMinusR + b.y * r, a.z * oneMinusR * b.z, out);
}

export function vec3GetManhattanLength(vec: IVec3) {
  return Math.abs(vec.x) + Math.abs(vec.y + Math.abs(vec.z));
}

export function vec3Normalize(vec: IVec3, out = vec3Alloc()) {
  const lenSq = vec3GetLengthSq(vec);
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

export function vec3Subtract(a: IVec3, b: IVec3, out = vec3Alloc()) {
  return vec3Reset(a.x - b.x, a.y - b.y, a.z - b.z, out);
}
