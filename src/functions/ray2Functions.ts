import { IRay2, IMat2x3, IVec2 } from "../types";
import { vec2Alloc, vec2Reset, vec2Subtract, vec2Normalize, vec2TransformBy } from "./vec2Functions";
import { mat2x3Alloc, mat2x3Reset } from "./mat2x3Functions";

const TMP_VEC0 = vec2Alloc();
const TMP_VEC1 = vec2Alloc();
const TMP_MAT0 = mat2x3Alloc();
const TMP_RAY0 = rayAlloc();

class Ray implements IRay2 {
  constructor(public x0 = NaN, public y0 = NaN, public dirX = NaN, public dirY = NaN) {}
}

export function rayAlloc(): IRay2 {
  return new Ray();
}

export function rayAt(ray: IRay2, t: number, out = vec2Alloc()) {
  return vec2Reset(ray.x0 + ray.dirX * t, ray.y0 + ray.dirY * t, out);
}

export function rayClone(ray: IRay2, out = rayAlloc()) {
  return rayReset(ray.x0, ray.y0, ray.dirX, ray.dirY, out);
}

export function rayGetDirectionVector(ray: IRay2, out = vec2Alloc()) {
  return vec2Reset(ray.dirX, ray.dirY, out);
}

export function rayGetInitialPoint(ray: IRay2, out = vec2Alloc()) {
  return vec2Reset(ray.x0, ray.y0, out);
}

export function rayIntersectRay2(r1: IRay2, r2: IRay2, out = vec2Alloc()) {
  const t = rayIntersectRay2T(r1, r2);
  return rayAt(r1, t, out);
}

export function rayIntersectRay2T(r1: IRay2, r2: IRay2) {
  const transform = mat2x3Reset(r1.dirX, -r1.dirY, r1.dirY, r1.dirX, 0, 0, TMP_MAT0);
  const localRay2 = rayTransformBy(r2, transform, TMP_RAY0);

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

export function rayLookAt(from: IVec2, to: IVec2, out = rayAlloc()) {
  vec2Subtract(to, from, TMP_VEC0);
  vec2Normalize(TMP_VEC0, TMP_VEC0);
  return rayReset(from.x, from.y, TMP_VEC0.x, TMP_VEC0.y, out);
}

export function rayReset(x0: number, y0: number, dirX: number, dirY: number, out = rayAlloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.dirX = dirX;
  out.dirY = dirY;
  return out;
}

export function rayTransformBy(ray: IRay2, mat: IMat2x3, out = rayAlloc()) {
  vec2Reset(ray.x0, ray.y0, TMP_VEC0);
  vec2TransformBy(TMP_VEC0, mat, TMP_VEC0);
  vec2Reset(ray.x0 + ray.dirX, ray.y0 + ray.dirY, TMP_VEC1);
  vec2TransformBy(TMP_VEC1, mat, TMP_VEC1);

  return rayLookAt(TMP_VEC0, TMP_VEC1, out);
}
