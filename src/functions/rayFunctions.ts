import { _rayLookAt } from "../internal/internalFunctions";
import { EPSILON, EPSILON_SQ } from "../internal/parameters";
import { IMat2x3, IRay, ISegment, IVec } from "../types";
import { mat2x3Alloc, mat2x3Reset, mat2x3AffDeterminant } from "./mat2x3Functions";
import { segmentGetLengthSq } from "./segmentFunctions";
import { vecAlloc, vecDistance, vecDistanceSq, vecReset, vecTransformByAff } from "./vecFunctions";

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

const TMP_rayContainsPoint_0 = vecAlloc();
export function rayContainsPoint(ray: IRay, point: IVec) {
  const t = Math.max(_rayProjectT(ray, point), 0);
  if (t < 0) {
    const initial = vecReset(ray.x0, ray.y0, TMP_rayContainsPoint_0);
    return vecDistanceSq(initial, point) < EPSILON_SQ;
  } else {
    return Math.abs(_rayProjectPerp(ray, point)) < EPSILON;
  }
}

const TMP_rayGetClosestDistance_0 = vecAlloc();
export function rayGetClosestDistance(ray: IRay, point: IVec) {
  const t = Math.max(_rayProjectT(ray, point), 0);
  if (t < 0) {
    const initial = vecReset(ray.x0, ray.y0, TMP_rayGetClosestDistance_0);
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

export function rayIntersectRayPoint(a: IRay, b: IRay, out = vecAlloc()) {
  const t = rayIntersectRayT(a, b);
  return rayPointAt(a, t, out);
}

const TMP_rayIntersectRayT_0 = mat2x3Alloc();
const TMP_rayIntersectRayT_1 = rayAlloc();
export function rayIntersectRayT(a: IRay, b: IRay) {
  const transform = mat2x3Reset(a.dirX, -a.dirY, a.dirY, a.dirX, -a.x0, -a.y0, TMP_rayIntersectRayT_0);
  const localB = rayTransformByAff(b, transform, TMP_rayIntersectRayT_1);

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

const TMP_rayIntersectSegmentT_0 = vecAlloc();
export function rayIntersectSegmentT(ray: IRay, segment: ISegment) {
  const segLengthSq = segmentGetLengthSq(segment);
  if (segLengthSq < EPSILON_SQ) {
    const degenerateSegment = vecReset(segment.x0, segment.y0, TMP_rayIntersectSegmentT_0);
    return rayContainsPoint(ray, degenerateSegment) ? _rayProjectT(ray, degenerateSegment) : NaN;
  } else {
    // TODO
    return 0;
  }
}

export function rayLookAt(from: IVec, to: IVec, out = rayAlloc()) {
  return _rayLookAt(from.x, from.y, to.x, to.y, out);
}

export function rayReset(x0: number, y0: number, dirX: number, dirY: number, out = rayAlloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.dirX = dirX;
  out.dirY = dirY;
  return out;
}

const TMP_rayTransformByAff_0 = vecAlloc();
const TMP_rayTransformByAff_1 = vecAlloc();
export function rayTransformByAff(ray: IRay, mat: IMat2x3, out = rayAlloc()) {
  const initial = vecReset(ray.x0, ray.y0, TMP_rayTransformByAff_0);
  vecTransformByAff(initial, mat, initial);
  const other = vecReset(ray.x0 + ray.dirX, ray.y0 + ray.dirY, TMP_rayTransformByAff_1);
  vecTransformByAff(other, mat, other);
  return rayLookAt(initial, other, out);
}

function _rayProjectT(ray: IRay, point: IVec) {
  return (point.x - ray.x0) * ray.dirX + (point.y - ray.y0) * ray.dirY;
}

function _rayProjectPerp(ray: IRay, point: IVec) {
  return (point.y - ray.y0) * ray.dirX - (point.x - ray.x0) * ray.dirY;
}
