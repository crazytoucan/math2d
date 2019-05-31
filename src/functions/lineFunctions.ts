import { _rayLookAt, _rayTransformByOrtho } from "../internal/internalFunctions";
import { EPSILON, EPSILON_SQ } from "../internal/parameters";
import { ILine, IMat2x3, ISegment, IVec } from "../types";
import { mat2x3Alloc, mat2x3Reset } from "./mat2x3Functions";
import { rayAlloc, rayTransformByAff } from "./rayFunctions";
import { segmentGetLengthSq } from "./segmentFunctions";
import { vecAlloc, vecNormalize, vecReset, vecSubtract } from "./vecFunctions";

class Line implements ILine {
  constructor(public x0 = NaN, public y0 = NaN, public dirX = NaN, public dirY = NaN) {}
}

export function lineAlloc(): ILine {
  return new Line();
}

export function linePointAt(line: ILine, t: number, out = vecAlloc()) {
  return vecReset(line.x0 + line.dirX * t, line.y0 + line.dirY * t, out);
}

export function lineClone(line: ILine, out = lineAlloc()) {
  return lineReset(line.x0, line.y0, line.dirX, line.dirY, out);
}

export function lineContainsPoint(line: ILine, point: IVec) {
  return lineGetClosestSignedDistanceToPoint(line, point) < EPSILON;
}

export function lineGetClosestSignedDistanceToPoint(line: ILine, point: IVec) {
  return (point.y - line.y0) * line.dirX - (point.x - line.x0) * line.dirY;
}

export function lineGetClosestDistanceToPoint(line: ILine, point: IVec) {
  return Math.abs(lineGetClosestSignedDistanceToPoint(line, point));
}

export function lineProjectPoint(line: ILine, point: IVec, out = vecAlloc()) {
  const t = lineProjectT(line, point);
  return linePointAt(line, t, out);
}

export function lineProjectT(ray: ILine, point: IVec) {
  return (point.x - ray.x0) * ray.dirX + (point.y - ray.y0) * ray.dirY;
}

const TMP_lineIntersectRayT_0 = mat2x3Alloc();
const TMP_lineIntersectRayT_1 = rayAlloc();
export function lineIntersectLineT(a: ILine, b: ILine) {
  const transform = mat2x3Reset(a.dirX, -a.dirY, a.dirY, a.dirX, -a.x0, -a.y0, TMP_lineIntersectRayT_0);
  const localB = _rayTransformByOrtho(b, transform, TMP_lineIntersectRayT_1);

  if (Math.abs(localB.dirY) < EPSILON) {
    return Math.abs(localB.y0) < EPSILON ? 0 : NaN;
  } else {
    return localB.x0 - (localB.dirX / localB.dirY) * localB.y0;
  }
}

const TMP_rayIntersectSegmentT_0 = lineAlloc();
const TMP_rayIntersectSegmentT_1 = vecAlloc();
export function lineIntersectSegmentT(line: ILine, segment: ISegment) {
  const segmentRay = _rayLookAt(segment.x0, segment.y0, segment.x1, segment.y1, TMP_rayIntersectSegmentT_0);
  const segmentRayT = lineIntersectLineT(segmentRay, line);
  if (segmentRayT < 0 || segmentRayT * segmentRayT > segmentGetLengthSq(segment)) {
    return NaN;
  } else {
    const intersectionPoint = linePointAt(segmentRay, segmentRayT, TMP_rayIntersectSegmentT_1);
    return line.dirX * (intersectionPoint.x - line.x0) + line.dirY * (intersectionPoint.y - line.y0);
  }
}

const TMP_rayLookAt_0 = vecAlloc();
export function lineLookAt(from: IVec, to: IVec, out = lineAlloc()) {
  const dir = vecSubtract(to, from, TMP_rayLookAt_0);
  vecNormalize(dir, dir);
  return lineReset(from.x, from.y, dir.x, dir.y, out);
}

export function lineReset(x0: number, y0: number, dirX: number, dirY: number, out = lineAlloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.dirX = dirX;
  out.dirY = dirY;
  return out;
}

export function lineTransformByAff(line: ILine, mat: IMat2x3, out = lineAlloc()) {
  return rayTransformByAff(line, mat, out);
}
