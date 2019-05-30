import { IVec2, IMat2x3, IMat2 } from "../types";
import { ENGINE } from "../internal/engine";

class Vec2 implements IVec2 {
  constructor(public x = NaN, public y = NaN) {}
}

export function vec2Add(a: IVec2, b: IVec2, out = vec2Alloc()) {
  return vec2Reset(a.x + b.x, a.y + b.y, out);
}

export function vec2Alloc(): IVec2 {
  return new Vec2();
}

export function vec2Clone(vec: IVec2, out = vec2Alloc()) {
  return vec2Reset(vec.x, vec.y, out);
}

export function vec2Dot(a: IVec2, b: IVec2) {
  return a.x * b.x + a.y * b.y;
}

export function vec2Distance(a: IVec2, b: IVec2) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function vec2DistanceSq(a: IVec2, b: IVec2) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function vec2GetLength(vec: IVec2) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

export function vec2GetLengthSq(vec: IVec2) {
  return vec.x * vec.x + vec.y * vec.y;
}

export function vec2Lerp(a: IVec2, b: IVec2, r: number, out = vec2Alloc()) {
  return vec2Reset(a.x * (1 - r) + b.x * r, a.y * (1 - r) + b.y * r, out);
}

export function vec2GetManhattanLength(vec: IVec2) {
  return Math.abs(vec.x) + Math.abs(vec.y);
}

export function vec2Normalize(vec: IVec2, out = vec2Alloc()) {
  const lenSq = vec.x * vec.x + vec.y * vec.y;
  if (lenSq < ENGINE.epsilonSq) {
    return vec2Reset(NaN, NaN, out);
  } else {
    const lenInverse = 1 / Math.sqrt(lenSq);
    return vec2Reset(lenInverse * vec.x, lenInverse * vec.y, out);
  }
}

export function vec2Perp(vec: IVec2, out = vec2Alloc()) {
  return vec2Reset(-vec.y, vec.x, out);
}

export function vec2Reset(x: number, y: number, out = vec2Alloc()) {
  out.x = x;
  out.y = y;
  return out;
}

export function vec2Scale(vec: IVec2, scalar: number, out = vec2Alloc()) {
  return vec2Reset(vec.x * scalar, vec.y * scalar, out);
}

export function vec2Subtract(a: IVec2, b: IVec2, out = vec2Alloc()) {
  return vec2Reset(a.x - b.x, a.y - b.y, out);
}

export function vec2TransformBy(vec: IVec2, mat: IMat2, out = vec2Alloc()) {
  return vec2Reset(mat.m11 * vec.x + mat.m21 * vec.y, mat.m12 * vec.x + mat.m22 * vec.y, out);
}

export function vec2TransformByAff(vec: IVec2, mat: IMat2x3, out = vec2Alloc()) {
  return vec2Reset(mat.a * vec.x + mat.c * vec.y + mat.e, mat.b * vec.x + mat.d * vec.y + mat.f, out);
}
