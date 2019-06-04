import { ISegment } from "../types";

class Segment implements ISegment {
  constructor(public x0 = NaN, public y0 = NaN, public x1 = NaN, public y1 = NaN) {}
}

export function segmentAlloc(): ISegment {
  return new Segment();
}
