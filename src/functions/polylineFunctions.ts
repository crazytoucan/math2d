import {
  IInternalSegmentGetNearestPointResult,
  internalSegmentGetNearestPoint,
} from "../internal/internalSegmentFunctions";
import { EPSILON_SQ } from "../internal/parameters";
import { IMat2, IMat2x3, IPolyline, IVec } from "../types";
import { boxAlloc, boxEncapsulate, boxReset } from "./boxFunctions";
import { segmentAlloc, segmentReset } from "./segmentFunctions";
import {
  vecAlloc,
  vecDistance,
  vecDistanceSq,
  vecLerp,
  vecReset,
  vecTransformBy,
  vecTransformByAff,
} from "./vecFunctions";

const TMP_VEC0 = vecAlloc();
const TMP_VEC1 = vecAlloc();
const TMP_SEGMENT = segmentAlloc();
const TMP_NEAREST_POINT_RESULT: IInternalSegmentGetNearestPointResult = {
  d: NaN,
  distance: NaN,
};

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

export function polylineGetBounds(poly: IPolyline, out = boxAlloc()) {
  boxReset(Infinity, -Infinity, Infinity, -Infinity, out);
  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], TMP_VEC0);
    boxEncapsulate(out, v0, out);
  }

  return out;
}

export function polylineGetNumSegments(poly: IPolyline) {
  return poly.length / 2 - 1;
}

export function polylineGetSegment(poly: IPolyline, index: number, out = segmentAlloc()) {
  const l = 2 * index;
  return segmentReset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
}

export function polylineGetNearest(poly: IPolyline, point: IVec, out = vecAlloc()) {
  const d = polylineGetNearestT(poly, point);
  return polylineGetPointAt(poly, d, out);
}

export function polylineGetNearestT(poly: IPolyline, point: IVec) {
  let winningDistance = Infinity;
  let winningD = NaN;

  let traversed = 0;
  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const segment = polylineGetSegment(poly, i, TMP_SEGMENT);
    const result = internalSegmentGetNearestPoint(segment, point, TMP_NEAREST_POINT_RESULT);
    if (result.distance < winningDistance) {
      winningDistance = result.distance;
      winningD = traversed + result.d;
    }

    traversed += polylineGetSegmentLength(poly, i);
  }

  return winningD;
}

export function polylineGetLength(poly: IPolyline) {
  let length = 0;
  for (let i = 0; i < poly.length - 2; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], TMP_VEC0);
    const v1 = vecReset(poly[i + 2], poly[i + 3], TMP_VEC1);
    length += vecDistance(v0, v1);
  }

  return length;
}

export function polylineGetNearestVertexIndex(poly: IPolyline, point: IVec) {
  let winningDistanceSq = Infinity;
  let winningIndex = NaN;
  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const v0 = vecReset(poly[2 * i], poly[2 * i + 1], TMP_VEC0);
    const distanceSq = vecDistanceSq(point, v0);
    if (distanceSq < winningDistanceSq) {
      winningDistanceSq = distanceSq;
      winningIndex = i;
    }
  }

  return winningIndex;
}

export function polylineGetPointAt(poly: IPolyline, d: number, out = vecAlloc()) {
  if (d < 0) {
    return vecReset(NaN, NaN, out);
  }

  const len = polylineGetNumSegments(poly);
  let idx = 0;
  while (idx < len) {
    const segmentLength = polylineGetSegmentLength(poly, idx);
    if (d <= segmentLength) {
      const v0 = vecReset(poly[2 * idx], poly[2 * idx + 1], TMP_VEC0);
      const v1 = vecReset(poly[2 * idx + 2], poly[2 * idx + 3], TMP_VEC1);
      return vecLerp(v0, v1, d / segmentLength, out);
    } else {
      d -= segmentLength;
      ++idx;
    }
  }

  return vecReset(NaN, NaN, out);
}

export function polylineGetSegmentIndexAt(poly: IPolyline, d: number) {
  if (d < 0) {
    return -1;
  }

  const len = polylineGetNumSegments(poly);
  let traversed = 0;
  let idx = 0;
  while (idx < len && traversed < d) {
    traversed += polylineGetSegmentLength(poly, idx);
    ++idx;
  }

  return idx;
}

export function polylineGetSegmentLength(poly: IPolyline, idx: number) {
  const l = 2 * idx;
  const v0 = vecReset(poly[l], poly[l + 1], TMP_VEC0);
  const v1 = vecReset(poly[l + 2], poly[l + 3], TMP_VEC1);
  return vecDistance(v0, v1);
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

export function polylineTransformBy(poly: IPolyline, mat: IMat2, out = polylineAlloc()) {
  if (out.length !== poly.length) {
    out.length = poly.length;
  }

  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], TMP_VEC0);
    vecTransformBy(v0, mat, v0);
    out[i] = v0.x;
    out[i + 1] = v0.y;
  }

  return out;
}

export function polylineTransformByAff(poly: IPolyline, mat: IMat2x3, out = polylineAlloc()) {
  if (out.length !== poly.length) {
    out.length = poly.length;
  }

  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], TMP_VEC0);
    vecTransformByAff(v0, mat, v0);
    out[i] = v0.x;
    out[i + 1] = v0.y;
  }

  return out;
}
