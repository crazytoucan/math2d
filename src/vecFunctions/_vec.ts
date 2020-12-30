import { vecAlloc } from "./vecAlloc";

export function _vec(x: number, y: number) {
  const out = vecAlloc();
  out.x = x;
  out.y = y;
  return out;
}
