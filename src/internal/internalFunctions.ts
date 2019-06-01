import { intersectionReset } from "../functions/intersectionFunctions";
import {
  polylineClose,
  polylineGetNumSegments,
  polylineGetSegment,
  polylineIsClosed,
} from "../functions/polylineFunctions";
import { rayAlloc, rayReset } from "../functions/rayFunctions";
import { segmentGetLength } from "../functions/segmentFunctions";
import { vecNormalize, vecReset, vecTransformByAff } from "../functions/vecFunctions";
import { IIntersection, ILine, IMat2x3, IPolygon, IPolyline, IRay, ISegment, IVec } from "../types";
import { ALLOCATOR } from "./allocator";
import { _intersectionAlloc, _segmentAlloc, _vecAlloc } from "./dataClasses";

export function _clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export function _dot(line: ILine, point: IVec) {
  return line.dirX * (point.x - line.x0) + line.dirY * (point.y - line.y0);
}

export function _intersectionDNE(out: IIntersection) {
  out.exists = false;
  out.x = out.y = out.t0 = out.t1 = NaN;
  return out;
}

export function _intersectionExists(x: number, y: number, t0: number, t1: number, out: IIntersection) {
  out.exists = true;
  out.x = x;
  out.y = y;
  out.t0 = t0;
  out.t1 = t1;
  return out;
}

export function _intersectionSwap(out: IIntersection) {
  const tmp = out.t0;
  out.t0 = out.t1;
  out.t1 = tmp;
  return out;
}

const TMP_rayLookAt_0 = _vecAlloc();
export function _rayLookAt(x0: number, y0: number, x1: number, y1: number, out: IRay) {
  const dir = vecReset(x1 - x0, y1 - y0, TMP_rayLookAt_0);
  vecNormalize(dir, dir);
  return rayReset(x0, y0, dir.x, dir.y, out);
}

const TMP_rayTransformByOrtho_0 = _vecAlloc();
export function _rayTransformByOrtho(ray: IRay, mat: IMat2x3, out = rayAlloc()) {
  const initial = vecReset(ray.x0, ray.y0, TMP_rayTransformByOrtho_0);
  vecTransformByAff(initial, mat, initial);
  return rayReset(initial.x, initial.y, mat.a * ray.dirX + mat.c * ray.dirY, mat.b * ray.dirX + mat.d * ray.dirY, out);
}

const TMP_polylineIntersectAllHelper_0 = _segmentAlloc();
const TMP_polylineIntersectAllHelper_1 = _intersectionAlloc();
export function _polylineIntersectAllHelper<T>(
  poly: IPolyline,
  value: T,
  doIntersectSegment: (segment: ISegment, value: T, out: IIntersection) => IIntersection,
) {
  const allIntersections: IIntersection[] = [];
  const numSegments = polylineGetNumSegments(poly);
  let traversed = 0;
  for (let i = 0; i < numSegments; i++) {
    const segment = polylineGetSegment(poly, i, TMP_polylineIntersectAllHelper_0);
    const segmentLength = segmentGetLength(segment);
    const out = doIntersectSegment(segment, value, TMP_polylineIntersectAllHelper_1);
    if (out.exists) {
      allIntersections.push(intersectionReset(true, out.x, out.y, traversed + out.t0 * segmentLength, out.t1));
    }

    traversed += segmentLength;
  }

  return allIntersections;
}

export function _polygonIntersectAllHelper<T>(
  poly: IPolygon,
  value: T,
  doIntersectSegment: (segment: ISegment, value: T, out: IIntersection) => IIntersection,
) {
  return _polylineIntersectAllHelper(_toPolyline(poly), value, doIntersectSegment);
}

function sortByT0Increasing(a: IIntersection, b: IIntersection) {
  return a.t0 < b.t0 ? -1 : a.t0 > b.t0 ? 1 : 0;
}

export function _invertValuesIterator(intersections: IIntersection[]) {
  intersections.forEach(_intersectionSwap);
  intersections.sort(sortByT0Increasing);
  return intersections.values();
}

export function _toPolyline(poly: IPolygon) {
  if (poly.length === 0) {
    return poly;
  } else if (polylineIsClosed(poly)) {
    return poly;
  } else {
    const alloc = ALLOCATOR.allocArray(0, poly.length + 2);
    polylineClose(poly, alloc);
    return alloc;
  }
}
