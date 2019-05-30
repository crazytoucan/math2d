import { IAffineMatrix, IPolygon, IVec } from "../types";
import { aabbAlloc } from "./aabbFunctions";
import {
  polylineGetBounds,
  polylineGetLength,
  polylineTransformBy,
  polylineIsClosed,
  polylineClose,
  polylineGetSegmentLength,
  polylineGetSegmentIndexAt,
  polylineGetPointAt,
  polylineGetNearestT,
  polylineGetNearestVertexIndex,
} from "./polylineFunctions";
import { ENGINE } from "../internal/engine";
import { vecAlloc, vecReset } from "./vecFunctions";

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

export function polygonGetBounds(poly: IPolygon, out = aabbAlloc()) {
  return polylineGetBounds(poly, out);
}

export function polygonGetNearest(poly: IPolygon, point: IVec, out = vecAlloc()) {
  const d = polylineGetNearestT(poly, point);
  return polylineGetPointAt(poly, d, out);
}

export function polygonGetNearestT(poly: IPolygon, point: IVec) {
  if (poly.length === 0) {
    return NaN;
  }

  const perimeter = polygonGetPerimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return 0;
  }

  return polylineGetNearestT(asPolylineInternal(poly), point);
}

export function polygonGetNearestVertex(poly: IPolygon, point: IVec) {
  return polylineGetNearestVertexIndex(poly, point);
}

export function polygonGetNumSides(poly: IPolygon) {
  return poly.length / 2;
}

export function polygonGetPerimeter(poly: IPolygon) {
  return polylineGetLength(asPolylineInternal(poly));
}

export function polygonGetPointAt(poly: IPolygon, t: number, out = vecAlloc()) {
  if (poly.length === 0) {
    return vecReset(NaN, NaN, out);
  }

  const perimeter = polygonGetPerimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return vecReset(poly[0], poly[1], out);
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polylineGetPointAt(asPolylineInternal(poly), t, out);
}

export function polygonGetSideIndexAt(poly: IPolygon, t: number) {
  const perimeter = polygonGetPerimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return 0;
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polylineGetSegmentIndexAt(asPolylineInternal(poly), t);
}

export function polygonGetSideLength(poly: IPolygon, idx: number) {
  return polylineGetSegmentLength(asPolylineInternal(poly), idx);
}

export function polygonTransformBy(poly: IPolygon, mat: IAffineMatrix, out = polygonAlloc()) {
  return polylineTransformBy(poly, mat, out);
}
