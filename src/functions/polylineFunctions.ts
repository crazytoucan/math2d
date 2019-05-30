import { IAffineMatrix, IPolyline, IVec } from "../types";
import { aabbAlloc, aabbIncludePoint, aabbReset } from "./aabbFunctions";
import { vecAlloc, vecDistance, vecReset, vecTransformBy, vecLerp, vecDistanceSquared } from "./vecFunctions";
import { segmentAlloc, segmentReset } from "./segmentFunctions";
import {
  IInternalSegmentGetNearestPointResult,
  internalSegmentGetNearestPoint,
} from "../internal/internalSegmentFunctions";
import { ENGINE } from "../internal/engine";

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

export function polylineBounds(poly: IPolyline, out = aabbAlloc()) {
  aabbReset(Infinity, -Infinity, Infinity, -Infinity, out);
  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], TMP_VEC0);
    aabbIncludePoint(out, v0, out);
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

export function polylineNearest(poly: IPolyline, point: IVec, out = vecAlloc()) {
  const d = polylineNearestT(poly, point);
  return polylinePointAt(poly, d, out);
}

export function polylineNearestT(poly: IPolyline, point: IVec) {
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

    traversed += polylineSegmentLength(poly, i);
  }

  return winningD;
}

export function polylineLength(poly: IPolyline) {
  let length = 0;
  for (let i = 0; i < poly.length - 2; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], TMP_VEC0);
    const v1 = vecReset(poly[i + 2], poly[i + 3], TMP_VEC1);
    length += vecDistance(v0, v1);
  }

  return length;
}

export function polylineNearestVertexIndex(poly: IPolyline, point: IVec) {
  let winningDistanceSq = Infinity;
  let winningIndex = NaN;
  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const v0 = vecReset(poly[2 * i], poly[2 * i + 1], TMP_VEC0);
    const distanceSq = vecDistanceSquared(point, v0);
    if (distanceSq < winningDistanceSq) {
      winningDistanceSq = distanceSq;
      winningIndex = i;
    }
  }

  return winningIndex;
}

export function polylinePointAt(poly: IPolyline, d: number, out = vecAlloc()) {
  if (d < 0) {
    return vecReset(NaN, NaN, out);
  }

  const len = polylineGetNumSegments(poly);
  let idx = 0;
  while (idx < len) {
    const segmentLength = polylineSegmentLength(poly, idx);
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

export function polylineSegmentIndexAt(poly: IPolyline, d: number) {
  if (d < 0) {
    return -1;
  }

  const len = polylineGetNumSegments(poly);
  let traversed = 0;
  let idx = 0;
  while (idx < len && traversed < d) {
    traversed += polylineSegmentLength(poly, idx);
    ++idx;
  }

  return idx;
}

export function polylineSegmentLength(poly: IPolyline, idx: number) {
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
    return dx * dx + dy * dy < ENGINE.epsilonSquared;
  }
}

export function polylineTransformBy(poly: IPolyline, mat: IAffineMatrix, out = polylineAlloc()) {
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
