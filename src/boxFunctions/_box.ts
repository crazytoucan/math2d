import { boxAlloc } from "./boxAlloc";

export function _box(minX: number, minY: number, maxX: number, maxY: number) {
  const out = boxAlloc();
  out.minX = minX;
  out.minY = minY;
  out.maxX = maxX;
  out.maxY = maxY;
  return out;
}
