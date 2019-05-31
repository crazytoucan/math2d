import { ISegment, IVec } from "../types";
import { vecAlloc, vecReset } from "./vecFunctions";
import {
  IInternalSegmentGetNearestPointResult,
  internalSegmentGetNearestPoint,
} from "../internal/internalSegmentFunctions";
import { EPSILON_SQ } from "../internal/parameters";

const TMP_SEGMENT_NEAREST_POINT_RESULT: IInternalSegmentGetNearestPointResult = {
  d: NaN,
  distance: NaN,
};

class Segment implements ISegment {
  constructor(public x0 = NaN, public y0 = NaN, public x1 = NaN, public y1 = NaN) {}
}

export function segmentAlloc(): ISegment {
  return new Segment();
}

export function segmentPointAt(segment: ISegment, t: number, out = vecAlloc()) {
  return vecReset(segment.x0 * (1 - t) + segment.x1 * t, segment.y0 * (1 - t) + segment.y1 * t, out);
}

export function segmentGetEndpoint0(segment: ISegment, out = vecAlloc()) {
  return vecReset(segment.x0, segment.y0, out);
}

export function segmentGetEndpoint1(segment: ISegment, out = vecAlloc()) {
  return vecReset(segment.x1, segment.y1, out);
}

export function segmentGetLength(segment: ISegment) {
  return Math.sqrt(segmentGetLengthSq(segment));
}

export function segmentGetLengthSq(segment: ISegment) {
  const dx = segment.x1 - segment.x0;
  const dy = segment.y1 - segment.y0;
  return dx * dx + dy * dy;
}

export function segmentGetNearestPoint(segment: ISegment, point: IVec, out = vecAlloc()) {
  const t = segmentGetNearestT(segment, point);
  return segmentPointAt(segment, t, out);
}

export function segmentGetNearestT(segment: ISegment, point: IVec) {
  const lengthSq = segmentGetLengthSq(segment);
  if (lengthSq < EPSILON_SQ) {
    return 0;
  }

  const result = internalSegmentGetNearestPoint(segment, point, TMP_SEGMENT_NEAREST_POINT_RESULT);
  return result.d / Math.sqrt(lengthSq);
}

export function segmentReverse(segment: ISegment, out = segmentAlloc()) {
  return segmentReset(segment.x1, segment.y1, segment.x0, segment.y0, out);
}

export function segmentReset(x0: number, y0: number, x1: number, y1: number, out = segmentAlloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.x1 = x1;
  out.y1 = y1;
  return out;
}
