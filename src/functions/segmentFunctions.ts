import { ISegment } from "../types";
import { vecAlloc, vecReset } from "./vecFunctions";

class Segment implements ISegment {
  constructor(public x0 = NaN, public y0 = NaN, public x1 = NaN, public y1 = NaN) {}
}

export function segmentAlloc(): ISegment {
  return new Segment();
}

export function segmentAt(segment: ISegment, t: number, out = vecAlloc()) {
  out.x = segment.x0 * (1 - t) + segment.x1 * t;
  out.y = segment.y0 * (1 - t) + segment.y1 * t;
  return out;
}

export function segmentGetEndpoint0(segment: ISegment, out = vecAlloc()) {
  return vecReset(segment.x0, segment.y0, out);
}

export function segmentGetEndpoint1(segment: ISegment, out = vecAlloc()) {
  return vecReset(segment.x1, segment.y1, out);
}

export function segmentLength(segment: ISegment) {
  return Math.sqrt(segmentLengthSquared(segment));
}

export function segmentLengthSquared(segment: ISegment) {
  const dx = segment.x1 - segment.x0;
  const dy = segment.y1 - segment.y0;
  return dx * dx + dy * dy;
}

export function segmentInvert(segment: ISegment, out = segmentAlloc()) {
  return segmentReset(segment.x1, segment.y1, segment.x0, segment.y0, out);
}

export function segmentNearestPoint() {}

export function segmentReset(x0: number, y0: number, x1: number, y1: number, out = segmentAlloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.x1 = x1;
  out.y1 = y1;
  return out;
}
