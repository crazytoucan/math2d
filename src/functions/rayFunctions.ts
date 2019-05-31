import { IMat2x3, IRay, IVec } from "../types";
import { mat2x3Alloc, mat2x3Reset } from "./mat2x3Functions";
import {
  vecAlloc,
  vecNormalize,
  vecReset,
  vecSubtract,
  vecTransformByAff,
  vecDistanceSq,
  vecDistance,
} from "./vecFunctions";
import { EPSILON_SQ, EPSILON } from "../internal/parameters";

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

export function rayContainsPoint(ray: IRay, point: IVec) {
  const t = Math.max(_rayProjectT(ray, point), 0);
  if (t < 0) {
    const initial = rayGetInitialPoint(ray, TMP_VEC0);
    return vecDistanceSq(initial, point) < EPSILON_SQ;
  } else {
    return Math.abs(_rayProjectPerp(ray, point)) < EPSILON;
  }
}

export function rayGetClosestDistance(ray: IRay, point: IVec) {
  const t = Math.max(_rayProjectT(ray, point), 0);
  if (t < 0) {
    const initial = rayGetInitialPoint(ray, TMP_VEC0);
    return vecDistance(initial, point);
  } else {
    return Math.abs(_rayProjectPerp(ray, point));
  }
}

export function rayGetClosestPoint(ray: IRay, point: IVec, out = vecAlloc()) {
  const t = rayGetClosestT(ray, point);
  return rayPointAt(ray, t, out);
}

export function rayGetClosestT(ray: IRay, point: IVec) {
  return Math.max(_rayProjectT(ray, point), 0);
}

export function rayGetDirection(ray: IRay, out = vecAlloc()) {
  return vecReset(ray.dirX, ray.dirY, out);
}

export function rayGetInitialPoint(ray: IRay, out = vecAlloc()) {
  return vecReset(ray.x0, ray.y0, out);
}

export function rayIntersectRayPoint(a: IRay, b: IRay, out = vecAlloc()) {
  const t = rayIntersectRayT(a, b);
  return rayPointAt(a, t, out);
}

export function rayIntersectRayT(a: IRay, b: IRay) {
  const transform = mat2x3Reset(a.dirX, -a.dirY, a.dirY, a.dirX, -a.x0, -a.y0, TMP_MAT0);
  const localB = rayTransformByAff(b, transform, TMP_RAY0);

  if (localB.y0 === 0) {
    if (localB.dirX > 0) {
      return Math.max(0, localB.x0);
    } else if (localB.dirX < 0 && localB.x0 >= 0) {
      return 0;
    } else {
      return NaN;
    }
  } else if (Math.sign(localB.y0) === Math.sign(localB.dirY)) {
    return NaN;
  } else {
    const intercept = localB.x0 - (localB.dirX * localB.y0) / localB.dirY;
    return intercept < 0 ? NaN : intercept;
  }
}

// export function rayIntersectSegmentT(a: IRay, segment: ISegment) {
//   const from = vecReset(segment.x0, segment.y0, TMP_VEC0);
//   const to = vecReset(segment.x1, segment.y1, TMP_VEC1);
//   const segmentRay = rayLookAt(from, to);
//   const segmentRay = rayLookAt();
// }

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

function _rayProjectT(ray: IRay, point: IVec) {
  return (point.x - ray.x0) * ray.dirX + (point.y - ray.y0) * ray.dirY;
}

function _rayProjectPerp(ray: IRay, point: IVec) {
  return (point.y - ray.y0) * ray.dirX - (point.x - ray.x0) * ray.dirY;
}
