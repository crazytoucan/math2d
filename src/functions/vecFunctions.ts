import { IVec, IAffineMatrix } from "../types";
import { ENGINE } from "../internal/engine";

class Vec implements IVec {
  constructor(public x = NaN, public y = NaN) {}
}

export function vecAdd(v1: IVec, v2: IVec, out = vecAlloc()) {
  return vecReset(v1.x + v2.x, v1.y + v2.y, out);
}

export function vecAlloc(): IVec {
  return new Vec();
}

export function vecClone(vec: IVec, out = vecAlloc()) {
  return vecReset(vec.x, vec.y, out);
}

export function vecDot(v1: IVec, v2: IVec) {
  return v1.x * v2.x + v1.y * v2.y;
}

export function vecDistance(v1: IVec, v2: IVec) {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function vecDistanceSquared(v1: IVec, v2: IVec) {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  return dx * dx + dy * dy;
}

export function vecGetLength(vec: IVec) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

export function vecGetLengthSquared(vec: IVec) {
  return vec.x * vec.x + vec.y * vec.y;
}

export function vecLerp(v1: IVec, v2: IVec, r: number, out = vecAlloc()) {
  return vecReset(v1.x * (1 - r) + v2.x * r, v1.y * (1 - r) + v2.y * r, out);
}

export function vecNormalize(vec: IVec, out = vecAlloc()) {
  const lenSquared = vec.x * vec.x + vec.y * vec.y;
  if (lenSquared < ENGINE.epsilonSquared) {
    return vecReset(NaN, NaN, out);
  } else {
    const lenInverse = 1 / Math.sqrt(lenSquared);
    return vecReset(lenInverse * vec.x, lenInverse * vec.y, out);
  }
}

export function vecPerp(vec: IVec, out = vecAlloc()) {
  return vecReset(-vec.y, vec.x, out);
}

export function vecReset(x: number, y: number, out = vecAlloc()) {
  out.x = x;
  out.y = y;
  return out;
}

export function vecScale(vec: IVec, scalar: number, out = vecAlloc()) {
  return vecReset(vec.x * scalar, vec.y * scalar, out);
}

export function vecSubtract(v1: IVec, v2: IVec, out = vecAlloc()) {
  return vecReset(v1.x - v2.x, v1.y - v2.y, out);
}

export function vecTransformBy(vec: IVec, mat: IAffineMatrix, out = vecAlloc()) {
  return vecReset(mat.a * vec.x + mat.c * vec.y + mat.e, mat.b * vec.x + mat.d * vec.y + mat.f, out);
}
