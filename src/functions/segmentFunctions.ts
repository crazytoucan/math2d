import { ISegment, IVec } from "../types";
import { vecAlloc, vecReset } from "./vecFunctions";
import { _clamp } from "../internal/internalFunctions";
import { EPSILON_SQ } from "../internal/parameters";

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
  const dSegX = segment.x1 - segment.x0;
  const dSegY = segment.y1 - segment.y0;
  const segLengthSq = dSegX * dSegX + dSegY * dSegY;
  if (segLengthSq < EPSILON_SQ) {
    return 0;
  }

  const dot = (point.x - segment.x0) * dSegX + (point.y - segment.y0) * dSegY;
  return _clamp(dot / segLengthSq, 0, 1);
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
