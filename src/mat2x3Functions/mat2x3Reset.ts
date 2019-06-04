import { mat2x3Alloc } from "./mat2x3Alloc";

export function mat2x3Reset(a: number, b: number, c: number, d: number, e: number, f: number, out = mat2x3Alloc()) {
  out.a = a;
  out.b = b;
  out.c = c;
  out.d = d;
  out.e = e;
  out.f = f;
  return out;
}
