import { _lineAlloc, _rayAlloc, _vecAlloc } from "../internal/allocFunctions";
import {
  _dot,
  _intersectionDNE,
  _intersectionSwap,
  _invertValuesIterator as _reorderValuesIterator,
  _polylineIntersectAllHelper,
  _rayLookAt,
} from "../internal/internalFunctions";
import { EPSILON } from "../internal/parameters";
import { IIntersection, ILine, IMat2x3, IPolyline, IRay, ISegment, IVec } from "../types";
import { intersectionAlloc } from "./intersectionFunctions";
import { lineClosestDistanceToPoint, lineIntersectLine, lineIntersectRay } from "./lineFunctions";
import { segmentGetLength, segmentIntersectRay } from "./segmentFunctions";
import { vecAlloc, vecDistance, vecReset, vecTransformByAff } from "./vecFunctions";

export function rayAlloc(): IRay {
  return _rayAlloc();
}

export function rayPointAt(ray: IRay, t: number, out = vecAlloc()) {
  return vecReset(ray.x0 + ray.dirX * t, ray.y0 + ray.dirY * t, out);
}

export function rayClone(ray: IRay, out = rayAlloc()) {
  return rayReset(ray.x0, ray.y0, ray.dirX, ray.dirY, out);
}

export function rayContainsPoint(ray: IRay, point: IVec) {
  return rayGetClosestDistanceToPoint(ray, point) < EPSILON;
}

const TMP_rayGetClosestDistance_0 = _vecAlloc();
export function rayGetClosestDistanceToPoint(ray: IRay, point: IVec) {
  const t = _dot(ray, point);
  if (t <= -EPSILON) {
    const initial = vecReset(ray.x0, ray.y0, TMP_rayGetClosestDistance_0);
    return vecDistance(initial, point);
  } else {
    return lineClosestDistanceToPoint(ray, point);
  }
}

export function rayGetClosestPoint(ray: IRay, point: IVec, out = vecAlloc()) {
  const t = Math.max(0, _dot(ray, point));
  return rayPointAt(ray, t, out);
}

export function rayIntersectLine(ray: IRay, line: ILine, out = intersectionAlloc()) {
  return _intersectionSwap(lineIntersectRay(line, ray, out));
}

export function rayIntersectPolylineIterator(ray: IRay, poly: IPolyline): IterableIterator<IIntersection> {
  return _reorderValuesIterator(_polylineIntersectAllHelper(poly, ray, segmentIntersectRay));
}

export function rayIntersectRay(a: IRay, b: IRay, out = intersectionAlloc()) {
  lineIntersectLine(a, b, out);
  return out.exists && out.t0 > -EPSILON && out.t1 > -EPSILON ? out : _intersectionDNE(out);
}

const TMP_rayIntersectSegment_0 = _lineAlloc();
export function rayIntersectSegment(ray: IRay, segment: ISegment, out = intersectionAlloc()) {
  const segmentRay = _rayLookAt(segment.x0, segment.y0, segment.x1, segment.y1, TMP_rayIntersectSegment_0);
  lineIntersectLine(ray, segmentRay, out);
  const segmentLength = segmentGetLength(segment);
  if (out.exists && out.t0 > -EPSILON && out.t1 > -EPSILON && out.t1 < segmentLength + EPSILON) {
    out.t1 /= segmentLength;
    return out;
  } else {
    return _intersectionDNE(out);
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

const TMP_rayTransformByAff_0 = _vecAlloc();
const TMP_rayTransformByAff_1 = _vecAlloc();
export function rayTransformByAff(ray: IRay, mat: IMat2x3, out = rayAlloc()) {
  const initial = vecReset(ray.x0, ray.y0, TMP_rayTransformByAff_0);
  vecTransformByAff(initial, mat, initial);
  const other = vecReset(ray.x0 + ray.dirX, ray.y0 + ray.dirY, TMP_rayTransformByAff_1);
  vecTransformByAff(other, mat, other);
  return rayLookAt(initial, other, out);
}
