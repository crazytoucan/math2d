import { ISegment2 } from "../types";
import { vec2Alloc, vec2Reset } from "./vec2Functions";

class Segment implements ISegment2 {
  constructor(public x0 = NaN, public y0 = NaN, public x1 = NaN, public y1 = NaN) {}
}

export function segment2Alloc(): ISegment2 {
  return new Segment();
}

export function segment2PointAt(segment: ISegment2, t: number, out = vec2Alloc()) {
  out.x = segment.x0 * (1 - t) + segment.x1 * t;
  out.y = segment.y0 * (1 - t) + segment.y1 * t;
  return out;
}

export function segment2GetEndpoint0(segment: ISegment2, out = vec2Alloc()) {
  return vec2Reset(segment.x0, segment.y0, out);
}

export function segment2GetEndpoint1(segment: ISegment2, out = vec2Alloc()) {
  return vec2Reset(segment.x1, segment.y1, out);
}

export function segment2GetLength(segment: ISegment2) {
  return Math.sqrt(segment2GetLengthSq(segment));
}

export function segment2GetLengthSq(segment: ISegment2) {
  const dx = segment.x1 - segment.x0;
  const dy = segment.y1 - segment.y0;
  return dx * dx + dy * dy;
}

export function segment2Reverse(segment: ISegment2, out = segment2Alloc()) {
  return segment2Reset(segment.x1, segment.y1, segment.x0, segment.y0, out);
}

export function segment2NearestPoint() {}

export function segment2Reset(x0: number, y0: number, x1: number, y1: number, out = segment2Alloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.x1 = x1;
  out.y1 = y1;
  return out;
}
