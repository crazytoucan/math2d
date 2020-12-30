import { segmentAlloc } from "./segmentAlloc";

export function _segment(x0: number, y0: number, x1: number, y1: number) {
  const out = segmentAlloc();
  out.x0 = x0;
  out.y0 = y0;
  out.x1 = x1;
  out.y1 = y1;
  return out;
}
