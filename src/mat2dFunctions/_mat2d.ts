import { mat2dAlloc } from "./mat2dAlloc";

export function _mat2d(a: number, b: number, c: number, d: number, e: number, f: number) {
  const out = mat2dAlloc();
  out.a = a;
  out.b = b;
  out.c = c;
  out.d = d;
  out.tx = e;
  out.ty = f;
  return out;
}
