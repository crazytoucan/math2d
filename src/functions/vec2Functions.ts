import { IVec2, IMat2x3 } from "../types";
import { ENGINE_STATIC } from "../internal/engine";

class Vec2 implements IVec2 {
  constructor(public x = NaN, public y = NaN) {}
}

export function vec2Add(v1: IVec2, v2: IVec2, out = vec2Alloc()) {
  out.x = v1.x + v2.x;
  out.y = v1.y + v2.y;
  return out;
}

export function vec2Alloc(): IVec2 {
  return new Vec2();
}

export function vec2Clone(vec: IVec2, out = vec2Alloc()) {
  out.x = vec.x;
  out.y = vec.y;
  return out;
}

export function vec2Distance(v1: IVec2, v2: IVec2) {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function vec2DistanceSquared(v1: IVec2, v2: IVec2) {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  return dx * dx + dy * dy;
}

export function vec2GetLength(vec: IVec2) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

export function vec2GetLengthSquared(vec: IVec2) {
  return vec.x * vec.x + vec.y * vec.y;
}

export function vec2Normalize(vec: IVec2, out = vec2Alloc()) {
  const lenSquared = vec.x * vec.x + vec.y * vec.y;
  if (lenSquared < ENGINE_STATIC.epsilonSquared) {
    out.x = out.y = NaN;
  } else {
    const lenInverse = 1 / Math.sqrt(lenSquared);
    out.x = lenInverse * vec.x;
    out.y = lenInverse * vec.y;
  }

  return out;
}

export function vec2Perp(vec: IVec2, out = vec2Alloc()) {
  const x = -vec.y;
  const y = vec.x;
  out.x = x;
  out.y = y;
}

export function vec2Reset(x: number, y: number, out = vec2Alloc()) {
  out.x = x;
  out.y = y;
  return out;
}

export function vec2Scale(vec: IVec2, scalar: number, out = vec2Alloc()) {
  out.x = vec.x * scalar;
  out.y = vec.y * scalar;
  return out;
}

export function vec2Subtract(v1: IVec2, v2: IVec2, out = vec2Alloc()) {
  out.x = v1.x - v2.x;
  out.y = v1.y - v2.y;
  return out;
}

export function vec2TransformBy(vec: IVec2, mat: IMat2x3, out = vec2Alloc()) {
  const x = mat.a * vec.x + mat.c * vec.y + mat.e;
  const y = mat.b * vec.x + mat.d * vec.y + mat.f;
  out.x = x;
  out.y = y;
  return out;
}
