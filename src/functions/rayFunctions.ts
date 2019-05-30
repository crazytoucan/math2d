import { IRay, IMat2x3, IVec } from "../types";
import {
  vecAlloc,
  vecReset,
  vecSubtract,
  vecNormalize,
  vecTransformByAff,
} from "./vecFunctions";
import { mat2x3Alloc, mat2x3Reset } from "./mat2x3Functions";

const TMP_VEC0 = vecAlloc();
const TMP_VEC1 = vecAlloc();
const TMP_MAT0 = mat2x3Alloc();
const TMP_RAY0 = rayAlloc();

class Ray implements IRay {
  constructor(public x0 = NaN, public y0 = NaN, public dirX = NaN, public dirY = NaN) {}
}

export function rayAlloc(): IRay {
  return new Ray();
}

export function rayPointAt(ray: IRay, t: number, out = vecAlloc()) {
  return vecReset(ray.x0 + ray.dirX * t, ray.y0 + ray.dirY * t, out);
}

export function rayClone(ray: IRay, out = rayAlloc()) {
  return rayReset(ray.x0, ray.y0, ray.dirX, ray.dirY, out);
}

export function rayGetDirection(ray: IRay, out = vecAlloc()) {
  return vecReset(ray.dirX, ray.dirY, out);
}

export function rayGetInitialPoint(ray: IRay, out = vecAlloc()) {
  return vecReset(ray.x0, ray.y0, out);
}

export function rayIntersectRay2Point(a: IRay, b: IRay, out = vecAlloc()) {
  const t = rayIntersectRay2T(a, b);
  return rayPointAt(a, t, out);
}

export function rayIntersectRay2T(a: IRay, b: IRay) {
  const transform = mat2x3Reset(a.dirX, -a.dirY, a.dirY, a.dirX, 0, 0, TMP_MAT0);
  const localRay2 = rayTransformByAff(b, transform, TMP_RAY0);

  if (localRay2.y0 === 0) {
    if (localRay2.dirX > 0) {
      return Math.max(0, localRay2.x0);
    } else if (localRay2.dirX < 0 && localRay2.x0 >= 0) {
      return 0;
    } else {
      return NaN;
    }
  } else if (localRay2.y0 * localRay2.dirY >= 0) {
    return NaN;
  } else {
    const intercept = localRay2.x0 - (localRay2.dirX * localRay2.y0) / localRay2.dirY;
    return intercept < 0 ? NaN : intercept;
  }
}

export function rayLookAt(from: IVec, to: IVec, out = rayAlloc()) {
  vecSubtract(to, from, TMP_VEC0);
  vecNormalize(TMP_VEC0, TMP_VEC0);
  return rayReset(from.x, from.y, TMP_VEC0.x, TMP_VEC0.y, out);
}

export function rayReset(x0: number, y0: number, dirX: number, dirY: number, out = rayAlloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.dirX = dirX;
  out.dirY = dirY;
  return out;
}

export function rayTransformByAff(ray: IRay, mat: IMat2x3, out = rayAlloc()) {
  vecReset(ray.x0, ray.y0, TMP_VEC0);
  vecTransformByAff(TMP_VEC0, mat, TMP_VEC0);
  vecReset(ray.x0 + ray.dirX, ray.y0 + ray.dirY, TMP_VEC1);
  vecTransformByAff(TMP_VEC1, mat, TMP_VEC1);
  return rayLookAt(TMP_VEC0, TMP_VEC1, out);
}
