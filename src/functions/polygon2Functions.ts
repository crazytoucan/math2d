import { IMat2x3, IPolygon2, IVec2, IMat2 } from "../types";
import { box2Alloc } from "./box2Functions";
import {
  polyline2GetBounds,
  polyline2GetLength,
  polyline2TransformByAff,
  polyline2IsClosed,
  polyline2Close,
  polyline2GetSegmentLength,
  polyline2GetSegmentIndexAt,
  polyline2GetPointAt,
  polyline2GetNearestT,
  polyline2GetNearestVertexIndex,
  polyline2TransformBy,
} from "./polyline2Functions";
import { vec2Alloc, vec2Reset } from "./vec2Functions";
import { segment2Alloc, segment2Reset } from "./segment2Functions";
import { ALLOCATOR } from "../internal/allocator";
import { EPSILON } from "../internal/parameters";

function asPolylineInternal(poly: IPolygon2) {
  if (poly.length === 0) {
    return poly;
  } else if (polyline2IsClosed(poly)) {
    return poly;
  } else {
    const alloc = ALLOCATOR.allocArray(0, poly.length + 2);
    polyline2Close(poly, alloc);
    return alloc;
  }
}

export function polygon2Alloc(): IPolygon2 {
  return [];
}

export function polygon2GetBounds(poly: IPolygon2, out = box2Alloc()) {
  return polyline2GetBounds(poly, out);
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

export function polygon2GetNearestPoint(poly: IPolygon2, point: IVec2, out = vec2Alloc()) {
  const d = polyline2GetNearestT(poly, point);
  return polyline2GetPointAt(poly, d, out);
}

export function polygon2GetNearestT(poly: IPolygon2, point: IVec2) {
  if (poly.length === 0) {
    return NaN;
  }

  const perimeter = polygon2GetPerimeter(poly);
  if (perimeter < EPSILON) {
    return 0;
  }

  return polyline2GetNearestT(asPolylineInternal(poly), point);
}

export function polygon2GetNearestVertexIndex(poly: IPolygon2, point: IVec2) {
  return polyline2GetNearestVertexIndex(poly, point);
}

export function polygon2GetNumSides(poly: IPolygon2) {
  return poly.length / 2;
}

export function polygon2GetPerimeter(poly: IPolygon2) {
  return polyline2GetLength(asPolylineInternal(poly));
}

export function polygon2GetPointAt(poly: IPolygon2, t: number, out = vec2Alloc()) {
  if (poly.length === 0) {
    return vec2Reset(NaN, NaN, out);
  }

  const perimeter = polygon2GetPerimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return vec2Reset(poly[0], poly[1], out);
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polyline2GetPointAt(asPolylineInternal(poly), t, out);
}

export function polygon2GetSideSegment(poly: IPolygon2, index: number, out = segment2Alloc()) {
  if (poly.length === 0) {
    return segment2Reset(NaN, NaN, NaN, NaN, out);
  } else if (index === poly.length / 2) {
    return segment2Reset(poly[poly.length - 2], poly[poly.length - 1], poly[0], poly[1]);
  } else {
    const l = 2 * index;
    return segment2Reset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
  }
}

export function polygon2GetSideIndexAt(poly: IPolygon2, t: number) {
  const perimeter = polygon2GetPerimeter(poly);
  if (perimeter < ENGINE.epsilon) {
    return 0;
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polyline2GetSegmentIndexAt(asPolylineInternal(poly), t);
}

export function polygon2GetSideLength(poly: IPolygon2, idx: number) {
  return polyline2GetSegmentLength(asPolylineInternal(poly), idx);
}

export function polygon2TransformBy(poly: IPolygon2, mat: IMat2, out = polygon2Alloc()) {
  return polyline2TransformBy(poly, mat, out);
}

export function polygon2TransformByAff(poly: IPolygon2, mat: IMat2x3, out = polygon2Alloc()) {
  return polyline2TransformByAff(poly, mat, out);
}
