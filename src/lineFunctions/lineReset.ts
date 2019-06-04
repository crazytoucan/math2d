import { lineAlloc } from "./lineAlloc";

export function lineReset(x0: number, y0: number, dirX: number, dirY: number, out = lineAlloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.dirX = dirX;
  out.dirY = dirY;
  return out;
}

