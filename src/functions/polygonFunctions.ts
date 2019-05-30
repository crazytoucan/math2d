import { IAffineMatrix, IPolygon, IVec } from "../types";
import { aabbAlloc } from "./aabbFunctions";
import {
  polylineBounds,
  polylineLength,
  polylineTransformBy,
  polylineIsClosed,
  polylineClose,
  polylineSegmentLength,
  polylineSegmentIndexAt,
  polylinePointAt,
  polylineNearestT,
  polylineNearestVertexIndex,
} from "./polylineFunctions";
import { ENGINE } from "../internal/engine";
import { vecAlloc, vecReset } from "./vecFunctions";
import { segmentAlloc, segmentReset } from "./segmentFunctions";

function asPolylineInternal(poly: IPolygon) {
  if (poly.length === 0) {
    return poly;
  } else if (polylineIsClosed(poly)) {
    return poly;
  } else {
    const alloc = ENGINE.allocArray(0, poly.length + 2);
    polylineClose(poly, alloc);
    return alloc;
  }
}

export function polygonAlloc(): IPolygon {
  return [];
}

export function polygonBounds(poly: IPolygon, out = aabbAlloc()) {
  return polylineBounds(poly, out);
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

export function polygonGetNumSides(poly: IPolygon) {
  return poly.length / 2;
}

export function polygonGetSide(poly: IPolygon, index: number, out = segmentAlloc()) {
  if (poly.length === 0) {
    return segmentReset(NaN, NaN, NaN, NaN, out);
  } else if (index === poly.length / 2) {
    return segmentReset(poly[poly.length - 2], poly[poly.length - 1], poly[0], poly[1]);
  } else {
    const l = 2 * index;
    return segmentReset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
  }
}

export function polygonNearest(poly: IPolygon, point: IVec, out = vecAlloc()) {
  const d = polylineNearestT(poly, point);
  return polylinePointAt(poly, d, out);
}

export function polygonNearestT(poly: IPolygon, point: IVec) {
  if (poly.length === 0) {
    return NaN;
  }

  const perimeter = polygonPerimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return 0;
  }

  return polylineNearestT(asPolylineInternal(poly), point);
}

export function polygonNearestVertex(poly: IPolygon, point: IVec) {
  return polylineNearestVertexIndex(poly, point);
}

export function polygonPerimeter(poly: IPolygon) {
  return polylineLength(asPolylineInternal(poly));
}

export function polygonPointAt(poly: IPolygon, t: number, out = vecAlloc()) {
  if (poly.length === 0) {
    return vecReset(NaN, NaN, out);
  }

  const perimeter = polygonPerimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return vecReset(poly[0], poly[1], out);
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polylinePointAt(asPolylineInternal(poly), t, out);
}

export function polygonSideIndexAt(poly: IPolygon, t: number) {
  const perimeter = polygonPerimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return 0;
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polylineSegmentIndexAt(asPolylineInternal(poly), t);
}

export function polygonSideLength(poly: IPolygon, idx: number) {
  return polylineSegmentLength(asPolylineInternal(poly), idx);
}

export function polygonTransformBy(poly: IPolygon, mat: IAffineMatrix, out = polygonAlloc()) {
  return polylineTransformBy(poly, mat, out);
}
