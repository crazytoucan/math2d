import { EPSILON_SQ } from "../internal/parameters";
import { IMat2x3, IPolyline, IVec } from "../types";
import { boxAlloc, boxEncapsulate, boxReset } from "./boxFunctions";
import { segmentAlloc, segmentNearestT, segmentPointAt, segmentReset } from "./segmentFunctions";
import { vecAlloc, vecDistanceSq, vecLerp, vecReset, vecTransformByAff } from "./vecFunctions";

export function polylineAlloc(): IPolyline {
  return [];
}

export function polylineClose(poly: IPolyline, out = polylineAlloc()) {
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

const TMP_polylineGetBounds_0 = vecAlloc();
export function polylineGetBounds(poly: IPolyline, out = boxAlloc()) {
  boxReset(Infinity, -Infinity, Infinity, -Infinity, out);
  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], TMP_polylineGetBounds_0);
    boxEncapsulate(out, v0, out);
  }

  return out;
}

export function polylineGetLength(poly: IPolyline) {
  const numSegments = polylineGetNumSegments(poly);
  let length = 0;
  for (let i = 0; i < numSegments; i++) {
    length += polylineGetSegmentLength(poly, i);
  }

  return length;
}

export function polylineGetNumSegments(poly: IPolyline) {
  return poly.length / 2 - 1;
}

export function polylineGetSegment(poly: IPolyline, index: number, out = segmentAlloc()) {
  const l = 2 * index;
  return segmentReset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
}

export function polylineGetSegmentLength(poly: IPolyline, idx: number) {
  const l = 2 * idx;
  const dx = poly[l + 2] - poly[l];
  const dy = poly[l + 3] - poly[l + 1];
  return Math.sqrt(dx * dx + dy * dy);
}

export function polylineGetVertex(poly: IPolyline, index: number, out = vecAlloc()) {
  const l = 2 * index;
  return l >= 0 && l < poly.length ? vecReset(poly[l], poly[l + 1], out) : vecReset(NaN, NaN, out);
}

export function polylineIsClosed(poly: IPolyline) {
  if (poly.length === 0) {
    return true;
  } else {
    const dx = poly[poly.length - 2] - poly[0];
    const dy = poly[poly.length - 1] - poly[1];
    return dx * dx + dy * dy < EPSILON_SQ;
  }
}

export function polylineNearestPoint(poly: IPolyline, point: IVec, out = vecAlloc()) {
  const d = polylineNearestT(poly, point);
  return polylinePointAt(poly, d, out);
}

const TMP_polylineNearestT_0 = segmentAlloc();
const TMP_polylineNearestT_1 = vecAlloc();
export function polylineNearestT(poly: IPolyline, point: IVec) {
  let winningDistanceSq = Infinity;
  let winningD = NaN;

  let traversed = 0;
  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const segment = polylineGetSegment(poly, i, TMP_polylineNearestT_0);
    const segmentT = segmentNearestT(segment, point);
    const segmentLength = polylineGetSegmentLength(poly, i);

    const closestPointOnSegment = segmentPointAt(segment, segmentT, TMP_polylineNearestT_1);
    const distanceSq = vecDistanceSq(point, closestPointOnSegment);
    if (distanceSq < winningDistanceSq) {
      winningDistanceSq = distanceSq;
      winningD = traversed + segmentT * segmentLength;
    }

    traversed += segmentLength;
  }

  return winningD;
}

const TMP_polylineNearestVertexIndex_0 = vecAlloc();
export function polylineNearestVertexIndex(poly: IPolyline, point: IVec) {
  let winningDistanceSq = Infinity;
  let winningIndex = NaN;
  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const v0 = vecReset(poly[2 * i], poly[2 * i + 1], TMP_polylineNearestVertexIndex_0);
    const distanceSq = vecDistanceSq(point, v0);
    if (distanceSq < winningDistanceSq) {
      winningDistanceSq = distanceSq;
      winningIndex = i;
    }
  }

  return winningIndex;
}

const TMP_polylinePointAt_0 = vecAlloc();
const TMP_polylinePointAt_1 = vecAlloc();
export function polylinePointAt(poly: IPolyline, d: number, out = vecAlloc()) {
  if (d < 0) {
    return vecReset(NaN, NaN, out);
  }

  const len = polylineGetNumSegments(poly);
  let idx = 0;
  while (idx < len) {
    const segmentLength = polylineGetSegmentLength(poly, idx);
    if (d <= segmentLength) {
      const v0 = vecReset(poly[2 * idx], poly[2 * idx + 1], TMP_polylinePointAt_0);
      const v1 = vecReset(poly[2 * idx + 2], poly[2 * idx + 3], TMP_polylinePointAt_1);
      return vecLerp(v0, v1, d / segmentLength, out);
    } else {
      d -= segmentLength;
      ++idx;
    }
  }

  return vecReset(NaN, NaN, out);
}

export function polylineSegmentIndexAt(poly: IPolyline, d: number) {
  if (d < 0) {
    return -1;
  }

  const numSegments = polylineGetNumSegments(poly);
  let traversed = 0;
  let idx = 0;
  while (idx < numSegments && traversed < d) {
    traversed += polylineGetSegmentLength(poly, idx);
    ++idx;
  }

  return idx;
}

const TMP_polylineTransformByAff_0 = vecAlloc();
export function polylineTransformByAff(poly: IPolyline, mat: IMat2x3, out = polylineAlloc()) {
  if (out.length !== poly.length) {
    out.length = poly.length;
  }

  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], TMP_polylineTransformByAff_0);
    vecTransformByAff(v0, mat, v0);
    out[i] = v0.x;
    out[i + 1] = v0.y;
  }

  return out;
}

const TMP_polylineTrim_0 = vecAlloc();
export function polylineTrim(poly: IPolyline, begin: number, end: number, out = polylineAlloc()) {
  if (begin > end || poly.length === 0) {
    out.length = 0;
    return;
  }

  begin = Math.max(begin, 0);
  end = Math.min(end, polylineGetLength(poly));
  const beginSegmentIdx = polylineSegmentIndexAt(poly, begin);
  const endSegmentIdx = polylineSegmentIndexAt(poly, end);
  out.length = 2 * (2 + endSegmentIdx - beginSegmentIdx);
  let cursor = 0;

  const vBegin = polylinePointAt(poly, begin, TMP_polylineTrim_0);
  out[cursor++] = vBegin.x;
  out[cursor++] = vBegin.y;

  for (let idx = beginSegmentIdx; idx < endSegmentIdx; idx++) {
    const vertex = polylineGetVertex(poly, idx + 1, TMP_polylineTrim_0);
    out[cursor++] = vertex.x;
    out[cursor++] = vertex.y;
  }

  const vEnd = polylinePointAt(poly, end, TMP_polylineTrim_0);
  out[cursor++] = vEnd.x;
  out[cursor++] = vEnd.y;
  return out;
}
