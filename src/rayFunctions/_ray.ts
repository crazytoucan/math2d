import { rayAlloc } from "./rayAlloc";

export function _ray(x0: number, y0: number, dirX: number, dirY: number) {
  const out = rayAlloc();
  out.x0 = x0;
  out.y0 = y0;
  out.dirX = dirX;
  out.dirY = dirY;
  return out;
}
