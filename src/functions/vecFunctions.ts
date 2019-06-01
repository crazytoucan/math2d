import { _vecAlloc } from "../internal/dataClasses";
import { EPSILON_SQ } from "../internal/parameters";
import { IMat2x3, IVec } from "../types";

export function vecAdd(a: IVec, b: IVec, out = vecAlloc()) {
  return vecReset(a.x + b.x, a.y + b.y, out);
}

export function vecAlloc(): IVec {
  return _vecAlloc();
}

export function vecClone(vec: IVec, out = vecAlloc()) {
  return vecReset(vec.x, vec.y, out);
}

export function vecDistance(a: IVec, b: IVec) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function vecDistanceSq(a: IVec, b: IVec) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function vecDot(a: IVec, b: IVec) {
  return a.x * b.x + a.y * b.y;
}

export function vecGetLength(vec: IVec) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

export function vecGetLengthSq(vec: IVec) {
  return vec.x * vec.x + vec.y * vec.y;
}

export function vecGetManhattanLength(vec: IVec) {
  return Math.abs(vec.x) + Math.abs(vec.y);
}

export function vecLerp(a: IVec, b: IVec, r: number, out = vecAlloc()) {
  return vecReset(a.x * (1 - r) + b.x * r, a.y * (1 - r) + b.y * r, out);
}

export function vecManhattanDistance(a: IVec, b: IVec) {
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
}

export function vecNormalize(vec: IVec, out = vecAlloc()) {
  const lenSq = vec.x * vec.x + vec.y * vec.y;
  if (lenSq < EPSILON_SQ) {
    return vecReset(NaN, NaN, out);
  } else {
    const lenInverse = 1 / Math.sqrt(lenSq);
    return vecReset(lenInverse * vec.x, lenInverse * vec.y, out);
  }
}

export function vecOrigin(out = vecAlloc()) {
  return vecReset(0, 0, out);
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

export function vecSubtract(a: IVec, b: IVec, out = vecAlloc()) {
  return vecReset(a.x - b.x, a.y - b.y, out);
}

export function vecTransformByAff(vec: IVec, mat: IMat2x3, out = vecAlloc()) {
  return vecReset(mat.a * vec.x + mat.c * vec.y + mat.e, mat.b * vec.x + mat.d * vec.y + mat.f, out);
}
