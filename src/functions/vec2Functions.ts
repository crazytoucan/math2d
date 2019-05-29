import { IVec2 } from "../types";
import { ENGINE_STATIC } from "../internal/engine";

class Vec2 implements IVec2 {
  constructor(public x = NaN, public y = NaN) {}
}

export function vec2Add(a: IVec2, b: IVec2, out = vec2Alloc()) {
  out.x = a.x + b.x;
  out.y = a.y + b.y;
  return out;
}

export function vec2Alloc(): IVec2 {
  return new Vec2();
}

export function vec2Distance(a: IVec2, b: IVec2) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function vec2DistanceSquared(a: IVec2, b: IVec2) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function vec2Length(vec: IVec2) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

export function vec2LengthSquared(vec: IVec2) {
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

export function vec2Subtract(a: IVec2, b: IVec2, out = vec2Alloc()) {
  out.x = a.x - b.x;
  out.y = a.y - b.y;
  return out;
}
