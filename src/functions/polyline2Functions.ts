import { IMat2x3, IPolyline2, IVec2, IMat2 } from "../types";
import { aabb2Alloc, aabb2IncludePoint, aabb2Reset } from "./aabb2Functions";
import { vec2Alloc, vec2Distance, vec2Reset, vec2TransformByAff, vec2Lerp, vec2DistanceSq, vec2TransformBy } from "./vec2Functions";
import { segment2Alloc, segment2Reset } from "./segment2Functions";
import {
  IInternalSegmentGetNearestPointResult,
  internalSegmentGetNearestPoint,
} from "../internal/internalSegmentFunctions";
import { ENGINE } from "../internal/engine";

const TMP_VEC0 = vec2Alloc();
const TMP_VEC1 = vec2Alloc();
const TMP_SEGMENT = segment2Alloc();
const TMP_NEAREST_POINT_RESULT: IInternalSegmentGetNearestPointResult = {
  d: NaN,
  distance: NaN,
};

export function polyline2Alloc(): IPolyline2 {
  return [];
}

export function polyline2Close(poly: IPolyline2, out = polyline2Alloc()) {
  const len = poly.length;
  if (len === 0) {
    out.length = 0;
    return out;
  }

  if (out.length !== len + 2) {
    out.length = len + 2;
  }

  for (let i = 0; i < len; i++) {
    out[i] = poly[i];
  }

  out[len] = poly[0];
  out[len + 1] = poly[1];
  return length;
}

export function polyline2GetBounds(poly: IPolyline2, out = aabb2Alloc()) {
  aabb2Reset(Infinity, -Infinity, Infinity, -Infinity, out);
  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vec2Reset(poly[i], poly[i + 1], TMP_VEC0);
    aabb2IncludePoint(out, v0, out);
  }

  return out;
}

export function polyline2GetNumSegments(poly: IPolyline2) {
  return poly.length / 2 - 1;
}

export function polyline2GetSegment(poly: IPolyline2, index: number, out = segment2Alloc()) {
  const l = 2 * index;
  return segment2Reset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
}

export function polyline2GetNearest(poly: IPolyline2, point: IVec2, out = vec2Alloc()) {
  const d = polyline2GetNearestT(poly, point);
  return polyline2GetPointAt(poly, d, out);
}

export function polyline2GetNearestT(poly: IPolyline2, point: IVec2) {
  let winningDistance = Infinity;
  let winningD = NaN;

  let traversed = 0;
  const len = polyline2GetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const segment2 = polyline2GetSegment(poly, i, TMP_SEGMENT);
    const result = internalSegmentGetNearestPoint(segment2, point, TMP_NEAREST_POINT_RESULT);
    if (result.distance < winningDistance) {
      winningDistance = result.distance;
      winningD = traversed + result.d;
    }

    traversed += polyline2GetSegmentLength(poly, i);
  }

  return winningD;
}

export function polyline2GetLength(poly: IPolyline2) {
  let length = 0;
  for (let i = 0; i < poly.length - 2; i += 2) {
    const v0 = vec2Reset(poly[i], poly[i + 1], TMP_VEC0);
    const v1 = vec2Reset(poly[i + 2], poly[i + 3], TMP_VEC1);
    length += vec2Distance(v0, v1);
  }

  return length;
}

export function polyline2GetNearestVertexIndex(poly: IPolyline2, point: IVec2) {
  let winningDistanceSq = Infinity;
  let winningIndex = NaN;
  const len = polyline2GetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const v0 = vec2Reset(poly[2 * i], poly[2 * i + 1], TMP_VEC0);
    const distanceSq = vec2DistanceSq(point, v0);
    if (distanceSq < winningDistanceSq) {
      winningDistanceSq = distanceSq;
      winningIndex = i;
    }
  }

  return winningIndex;
}

export function polyline2GetPointAt(poly: IPolyline2, d: number, out = vec2Alloc()) {
  if (d < 0) {
    return vec2Reset(NaN, NaN, out);
  }

  const len = polyline2GetNumSegments(poly);
  let idx = 0;
  while (idx < len) {
    const segment2Length = polyline2GetSegmentLength(poly, idx);
    if (d <= segment2Length) {
      const v0 = vec2Reset(poly[2 * idx], poly[2 * idx + 1], TMP_VEC0);
      const v1 = vec2Reset(poly[2 * idx + 2], poly[2 * idx + 3], TMP_VEC1);
      return vec2Lerp(v0, v1, d / segment2Length, out);
    } else {
      d -= segment2Length;
      ++idx;
    }
  }

  return vec2Reset(NaN, NaN, out);
}

export function polyline2GetSegmentIndexAt(poly: IPolyline2, d: number) {
  if (d < 0) {
    return -1;
  }

  const len = polyline2GetNumSegments(poly);
  let traversed = 0;
  let idx = 0;
  while (idx < len && traversed < d) {
    traversed += polyline2GetSegmentLength(poly, idx);
    ++idx;
  }

  return idx;
}

export function polyline2GetSegmentLength(poly: IPolyline2, idx: number) {
  const l = 2 * idx;
  const v0 = vec2Reset(poly[l], poly[l + 1], TMP_VEC0);
  const v1 = vec2Reset(poly[l + 2], poly[l + 3], TMP_VEC1);
  return vec2Distance(v0, v1);
}

export function polyline2IsClosed(poly: IPolyline2) {
  if (poly.length === 0) {
    return true;
  } else {
    const dx = poly[poly.length - 2] - poly[0];
    const dy = poly[poly.length - 1] - poly[1];
    return dx * dx + dy * dy < ENGINE.epsilonSq;
  }
}

export function polyline2TransformBy(poly: IPolyline2, mat: IMat2, out = polyline2Alloc()) {
  if (out.length !== poly.length) {
    out.length = poly.length;
  }

  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vec2Reset(poly[i], poly[i + 1], TMP_VEC0);
    vec2TransformBy(v0, mat, v0);
    out[i] = v0.x;
    out[i + 1] = v0.y;
  }

  return out;
}

export function polyline2TransformByAff(poly: IPolyline2, mat: IMat2x3, out = polyline2Alloc()) {
  if (out.length !== poly.length) {
    out.length = poly.length;
  }

  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vec2Reset(poly[i], poly[i + 1], TMP_VEC0);
    vec2TransformByAff(v0, mat, v0);
    out[i] = v0.x;
    out[i + 1] = v0.y;
  }

  return out;
}
