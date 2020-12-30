import { mat2dAlloc } from "./mat2dAlloc";

export function _mat2d(a: number, b: number, c: number, d: number, tx: number, ty: number) {
  const out = mat2dAlloc();
  out.a = a;
  out.b = b;
  out.c = c;
  out.d = d;
  out.tx = tx;
  out.ty = ty;
  return out;
}
