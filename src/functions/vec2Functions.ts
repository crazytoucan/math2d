import { IVec2, IMat2x3 } from "../types";
import { ENGINE } from "../internal/engine";

class Vec2 implements IVec2 {
  constructor(public x = NaN, public y = NaN) {}
}

export function vec2Add(v1: IVec2, v2: IVec2, out = vec2Alloc()) {
  return vec2Reset(v1.x + v2.x, v1.y + v2.y, out);
}

export function vec2Alloc(): IVec2 {
  return new Vec2();
}

export function vec2Clone(vec: IVec2, out = vec2Alloc()) {
  return vec2Reset(vec.x, vec.y, out);
}

export function vec2Dot(v1: IVec2, v2: IVec2) {
  return v1.x * v2.x + v1.y * v2.y;
}

export function vec2Distance(v1: IVec2, v2: IVec2) {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function vec2DistanceSq(v1: IVec2, v2: IVec2) {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  return dx * dx + dy * dy;
}

export function vec2Length(vec: IVec2) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

export function vec2LengthSq(vec: IVec2) {
  return vec.x * vec.x + vec.y * vec.y;
}

export function vec2Lerp(v1: IVec2, v2: IVec2, r: number, out = vec2Alloc()) {
  return vec2Reset(v1.x * (1 - r) + v2.x * r, v1.y * (1 - r) + v2.y * r, out);
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

export function vec2Subtract(v1: IVec2, v2: IVec2, out = vec2Alloc()) {
  return vec2Reset(v1.x - v2.x, v1.y - v2.y, out);
}

export function vec2TransformBy(vec: IVec2, mat: IMat2x3, out = vec2Alloc()) {
  return vec2Reset(mat.a * vec.x + mat.c * vec.y + mat.e, mat.b * vec.x + mat.d * vec.y + mat.f, out);
}
