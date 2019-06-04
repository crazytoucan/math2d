import { IMat2x3 } from "../types";
import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

export function mat2x3AffMulMat2x3(m1: IMat2x3, m2: IMat2x3, out = mat2x3Alloc()) {
  const a = m1.a * m2.a + m1.c * m2.b;
  const b = m1.b * m2.a + m1.d * m2.b;
  const c = m1.a * m2.c + m1.c * m2.d;
  const d = m1.b * m2.c + m1.d * m2.d;
  const e = m1.a * m2.e + m1.c * m2.f + m1.e;
  const f = m1.b * m2.e + m1.c * m2.f + m1.f;
  return mat2x3Reset(a, b, c, d, e, f, out);
}
