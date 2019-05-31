import { IMat2x3, IPolygon, IVec } from "../types";
import { boxAlloc } from "./boxFunctions";
import {
  polylineGetBounds,
  polylineGetLength,
  polylineTransformByAff,
  polylineIsClosed,
  polylineClose,
  polylineGetSegmentLength,
  polylineSegmentIndexAt,
  polylinePointAt,
  polylineNearestT,
  polylineNearestVertexIndex,
} from "./polylineFunctions";
import { vecAlloc, vecReset } from "./vecFunctions";
import { segmentAlloc, segmentReset } from "./segmentFunctions";
import { ALLOCATOR } from "../internal/allocator";
import { EPSILON } from "../internal/parameters";

function asPolylineInternal(poly: IPolygon) {
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

  return polylineNearestT(asPolylineInternal(poly), point);
}

export function polygonNearestVertexIndex(poly: IPolygon, point: IVec) {
  return polylineNearestVertexIndex(poly, point);
}

export function polygonGetNumSides(poly: IPolygon) {
  return poly.length / 2;
}

export function polygonGetPerimeter(poly: IPolygon) {
  return polylineGetLength(asPolylineInternal(poly));
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
  return polylinePointAt(asPolylineInternal(poly), t, out);
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
  return polylineSegmentIndexAt(asPolylineInternal(poly), t);
}

export function polygonGetSideLength(poly: IPolygon, idx: number) {
  return polylineGetSegmentLength(asPolylineInternal(poly), idx);
}

export function polygonTransformByAff(poly: IPolygon, mat: IMat2x3, out = polygonAlloc()) {
  return polylineTransformByAff(poly, mat, out);
}
