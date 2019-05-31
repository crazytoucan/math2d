import { _polygonIntersectAllHelper, _toPolyline } from "../internal/internalFunctions";
import { EPSILON } from "../internal/parameters";
import { IIntersection, ILine, IMat2x3, IPolygon, IRay, ISegment, IVec } from "../types";
import { boxAlloc } from "./boxFunctions";
import {
  polylineGetBounds,
  polylineGetLength,
  polylineGetSegmentLength,
  polylineNearestT,
  polylineNearestVertexIndex,
  polylinePointAt,
  polylineSegmentIndexAt,
  polylineTransformByAff,
} from "./polylineFunctions";
import {
  segmentAlloc,
  segmentIntersectLine,
  segmentIntersectRay,
  segmentIntersectSegment,
  segmentReset,
} from "./segmentFunctions";
import { vecAlloc, vecReset } from "./vecFunctions";

export function polygonAlloc(): IPolygon {
  return [];
}

export function polygonGetBounds(poly: IPolygon, out = boxAlloc()) {
  return polylineGetBounds(poly, out);
}

export function polygonContainsPoint(poly: IPolygon, point: IVec) {
  const x = point.x;
  const y = point.y;

  let inside = false;
  for (let i = 0; i < poly.length; i += 2) {
    const x0 = poly[i];
    const y0 = poly[i + 1];
    const x1 = i !== poly.length - 2 ? poly[i + 2] : poly[0];
    const y1 = i !== poly.length - 2 ? poly[i + 3] : poly[1];
    const intersects = y0 > y !== y1 > y && x - x0 < ((x1 - x0) * (y - y0)) / (y1 - y0);

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}

export function polygonIntersectLineIterator(poly: IPolygon, line: ILine): IterableIterator<IIntersection> {
  return _polygonIntersectAllHelper(poly, line, segmentIntersectLine).values();
}

export function polygonIntersectRayIterator(poly: IPolygon, ray: IRay): IterableIterator<IIntersection> {
  return _polygonIntersectAllHelper(poly, ray, segmentIntersectRay).values();
}

export function polygonIntersectSegmentIterator(poly: IPolygon, segment: ISegment): IterableIterator<IIntersection> {
  return _polygonIntersectAllHelper(poly, segment, segmentIntersectSegment).values();
}

export function polygonNearestPoint(poly: IPolygon, point: IVec, out = vecAlloc()) {
  const d = polygonNearestT(poly, point);
  return polygonPointAt(poly, d, out);
}

export function polygonNearestT(poly: IPolygon, point: IVec) {
  if (poly.length === 0) {
    return NaN;
  }

  const perimeter = polygonGetPerimeter(poly);
  if (perimeter < EPSILON) {
    return 0;
  }

  return polylineNearestT(_toPolyline(poly), point);
}

export function polygonNearestVertexIndex(poly: IPolygon, point: IVec) {
  return polylineNearestVertexIndex(poly, point);
}

export function polygonGetNumSides(poly: IPolygon) {
  return poly.length / 2;
}

export function polygonGetPerimeter(poly: IPolygon) {
  return polylineGetLength(_toPolyline(poly));
}

export function polygonPointAt(poly: IPolygon, t: number, out = vecAlloc()) {
  if (poly.length === 0) {
    return vecReset(NaN, NaN, out);
  }

  const perimeter = polygonGetPerimeter(poly);
  if (perimeter < EPSILON) {
    return vecReset(poly[0], poly[1], out);
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polylinePointAt(_toPolyline(poly), t, out);
}

export function polygonGetSideSegment(poly: IPolygon, index: number, out = segmentAlloc()) {
  if (poly.length === 0) {
    return segmentReset(NaN, NaN, NaN, NaN, out);
  } else if (index === poly.length / 2) {
    return segmentReset(poly[poly.length - 2], poly[poly.length - 1], poly[0], poly[1]);
  } else {
    const l = 2 * index;
    return segmentReset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
  }
}

export function polygonSideIndexAt(poly: IPolygon, t: number) {
  const perimeter = polygonGetPerimeter(poly);
  if (perimeter < EPSILON) {
    return 0;
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polylineSegmentIndexAt(_toPolyline(poly), t);
}

export function polygonGetSideLength(poly: IPolygon, idx: number) {
  return polylineGetSegmentLength(_toPolyline(poly), idx);
}

export function polygonTransformByAff(poly: IPolygon, mat: IMat2x3, out = polygonAlloc()) {
  return polylineTransformByAff(poly, mat, out);
}
