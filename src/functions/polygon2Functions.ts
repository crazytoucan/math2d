import { IMat2x3, IPolygon2, IVec2 } from "../types";
import { aabb2Alloc } from "./aabb2Functions";
import {
  polyline2Bounds,
  polyline2Length,
  polyline2TransformBy,
  polyline2IsClosed,
  polyline2Close,
  polyline2SegmentLength,
  polyline2SegmentIndexAt,
  polyline2PointAt,
  polyline2NearestT,
  polyline2NearestVertexIndex,
} from "./polyline2Functions";
import { ENGINE } from "../internal/engine";
import { vec2Alloc, vec2Reset } from "./vec2Functions";
import { segment2Alloc, segment2Reset } from "./segment2Functions";

function asPolylineInternal(poly: IPolygon2) {
  if (poly.length === 0) {
    return poly;
  } else if (polyline2IsClosed(poly)) {
    return poly;
  } else {
    const alloc = ENGINE.allocArray(0, poly.length + 2);
    polyline2Close(poly, alloc);
    return alloc;
  }
}

export function polygon2Alloc(): IPolygon2 {
  return [];
}

export function polygon2Bounds(poly: IPolygon2, out = aabb2Alloc()) {
  return polyline2Bounds(poly, out);
}

export function polygon2ContainsPoint(poly: IPolygon2, point: IVec2) {
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

export function polygon2GetNumSides(poly: IPolygon2) {
  return poly.length / 2;
}

export function polygon2GetSide(poly: IPolygon2, index: number, out = segment2Alloc()) {
  if (poly.length === 0) {
    return segment2Reset(NaN, NaN, NaN, NaN, out);
  } else if (index === poly.length / 2) {
    return segment2Reset(poly[poly.length - 2], poly[poly.length - 1], poly[0], poly[1]);
  } else {
    const l = 2 * index;
    return segment2Reset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
  }
}

export function polygon2Nearest(poly: IPolygon2, point: IVec2, out = vec2Alloc()) {
  const d = polyline2NearestT(poly, point);
  return polyline2PointAt(poly, d, out);
}

export function polygon2NearestT(poly: IPolygon2, point: IVec2) {
  if (poly.length === 0) {
    return NaN;
  }

  const perimeter = polygon2Perimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return 0;
  }

  return polyline2NearestT(asPolylineInternal(poly), point);
}

export function polygon2NearestVertex(poly: IPolygon2, point: IVec2) {
  return polyline2NearestVertexIndex(poly, point);
}

export function polygon2Perimeter(poly: IPolygon2) {
  return polyline2Length(asPolylineInternal(poly));
}

export function polygon2PointAt(poly: IPolygon2, t: number, out = vec2Alloc()) {
  if (poly.length === 0) {
    return vec2Reset(NaN, NaN, out);
  }

  const perimeter = polygon2Perimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return vec2Reset(poly[0], poly[1], out);
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polyline2PointAt(asPolylineInternal(poly), t, out);
}

export function polygon2SideIndexAt(poly: IPolygon2, t: number) {
  const perimeter = polygon2Perimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return 0;
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polyline2SegmentIndexAt(asPolylineInternal(poly), t);
}

export function polygon2SideLength(poly: IPolygon2, idx: number) {
  return polyline2SegmentLength(asPolylineInternal(poly), idx);
}

export function polygon2TransformBy(poly: IPolygon2, mat: IMat2x3, out = polygon2Alloc()) {
  return polyline2TransformBy(poly, mat, out);
}
