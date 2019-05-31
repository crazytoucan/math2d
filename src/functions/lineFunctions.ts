import {
  _dot,
  _intersectionDNE,
  _intersectionExists,
  _rayLookAt,
  _rayTransformByOrtho,
  _polylineIntersectAllHelper,
  _invertValuesIterator,
} from "../internal/internalFunctions";
import { EPSILON } from "../internal/parameters";
import { IIntersection, ILine, IMat2x3, IPolyline, IRay, ISegment, IVec } from "../types";
import { intersectionAlloc } from "./intersectionFunctions";
import { mat2x3Alloc, mat2x3Reset } from "./mat2x3Functions";
import { rayAlloc, rayTransformByAff } from "./rayFunctions";
import { segmentGetLength, segmentIntersectLine } from "./segmentFunctions";
import { vecAlloc, vecNormalize, vecReset, vecSubtract } from "./vecFunctions";
import { _lineAlloc } from "../internal/primitives";

export function lineAlloc() {
  return _lineAlloc();
}

export function linePointAt(line: ILine, t: number, out = vecAlloc()) {
  return vecReset(line.x0 + t * line.dirX, line.y0 + t * line.dirY, out);
}

export function lineClone(line: ILine, out = lineAlloc()) {
  return lineReset(line.x0, line.y0, line.dirX, line.dirY, out);
}

export function lineContainsPoint(line: ILine, point: IVec) {
  return lineClosestDistanceToPoint(line, point) < EPSILON;
}

export function lineClosestDistanceToPoint(line: ILine, point: IVec) {
  return Math.abs(lineClosestSignedDistanceToPoint(line, point));
}

export function lineClosestSignedDistanceToPoint(line: ILine, point: IVec) {
  return (point.y - line.y0) * line.dirX - (point.x - line.x0) * line.dirY;
}

export function lineProjectPoint(line: ILine, point: IVec, out = vecAlloc()) {
  const t = _dot(line, point);
  return vecReset(line.x0 + t * line.dirX, line.y0 + t * line.dirY, out);
}

const TMP_lineIntersectRayT_0 = mat2x3Alloc();
const TMP_lineIntersectRayT_1 = rayAlloc();
const TMP_lineIntersectRayT_2 = vecAlloc();
export function lineIntersectLine(a: ILine, b: ILine, out = intersectionAlloc()) {
  const transform = mat2x3Reset(a.dirX, -a.dirY, a.dirY, a.dirX, -a.x0, -a.y0, TMP_lineIntersectRayT_0);
  const localB = _rayTransformByOrtho(b, transform, TMP_lineIntersectRayT_1);
  const isParallel = Math.abs(localB.dirY) < EPSILON;

  if (isParallel && Math.abs(localB.y0) < EPSILON) {
    return _intersectionExists(a.x0, a.y0, 0, -localB.x0 * localB.dirX, out);
  } else if (isParallel) {
    return _intersectionDNE(out);
  } else {
    const t0 = localB.x0 - (localB.dirX / localB.dirY) * localB.y0;
    const intersectionPoint = linePointAt(a, t0, TMP_lineIntersectRayT_2);
    const t1 = _dot(b, intersectionPoint);
    return _intersectionExists(intersectionPoint.x, intersectionPoint.y, t0, t1, out);
  }
}

export function lineIntersectPolylineIterator(line: ILine, poly: IPolyline): IterableIterator<IIntersection> {
  return _invertValuesIterator(_polylineIntersectAllHelper(poly, line, segmentIntersectLine));
}

const TMP_lineIntersectSegment_0 = rayAlloc();
export function lineIntersectSegment(line: ILine, segment: ISegment, out = intersectionAlloc()) {
  // TODO: degenerate segment
  const segmentLine = _rayLookAt(segment.x0, segment.y0, segment.x1, segment.y1, TMP_lineIntersectSegment_0);
  const segmentLength = segmentGetLength(segment);
  lineIntersectLine(line, segmentLine, out);
  if (!out.exists || out.t1 < 0 || out.t1 > segmentLength) {
    return _intersectionDNE(out);
  } else {
    out.t1 /= segmentLength;
    return out;
  }
}

export function lineIntersectRay(line: ILine, ray: IRay, out = intersectionAlloc()) {
  lineIntersectLine(line, ray);
  return !out.exists || out.t1 < 0 ? _intersectionDNE(out) : out;
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

export function lineSide(line: ILine, point: IVec) {
  const d = lineClosestSignedDistanceToPoint(line, point);
  return Math.abs(d) < EPSILON ? 0 : Math.sign(d);
}

export function lineTransformByAff(line: ILine, mat: IMat2x3, out = lineAlloc()) {
  return rayTransformByAff(line, mat, out);
}
