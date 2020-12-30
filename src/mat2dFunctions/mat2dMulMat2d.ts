import { IMat2d } from "../types";
import { mat2dAlloc } from "./mat2dAlloc";
import { mat2dReset } from "./mat2dReset";

/**
 * Computes the result of affine matrix multiplication _m1_ × _m2_.
 *
 * The resulting matrix is equivalent to a transform that first applies _m2_ and then applies
 * _m1_; that is, `(m1×m2)v = m1(m2×v)`.
 *
 * Affine matrix multiplication is defined by
 *
 * ```
 * ⎡m1.a m1.c m1.e⎤ ⎡m2.a m2.c m2.e⎤   ⎡r.a r.c r.e⎤
 * ⎢m1.b m1.d m1.f⎥ ⎢m2.b m2.d m2.f⎥ = ⎢r.b r.d r.f⎥
 * ⎣   0    0    1⎦ ⎣   0    0    1⎦   ⎣  0   0   1⎦
 * ```
 *
 * where:
 *  - `r.a = m1.a * m2.a + m1.c * m2.b`
 *  - `r.b = m1.b * m2.a + m1.d * m2.b`
 *  - `r.c = m1.a * m2.c + m1.c * m2.d`
 *  - `r.d = m1.b * m2.c + m1.d * m2.d`
 *  - `r.e = m1.a * m2.e + m1.c * m2.f + m1.e`
 *  - `r.f = m1.b * m2.e + m1.c * m2.f + m1.f`
 *
 * @param m1 the first matrix to multiply
 * @param m2 the second matrix to multiply
 * @param out
 * __see {@link IMatrix}
 * __see {@link vecTransformBy}
 */
export function mat2dMulMat2d(m1: IMat2d, m2: IMat2d, out = mat2dAlloc()) {
  const a = m1.a * m2.a + m1.c * m2.b;
  const b = m1.b * m2.a + m1.d * m2.b;
  const c = m1.a * m2.c + m1.c * m2.d;
  const d = m1.b * m2.c + m1.d * m2.d;
  const e = m1.a * m2.e + m1.c * m2.f + m1.e;
  const f = m1.b * m2.e + m1.c * m2.f + m1.f;
  return mat2dReset(a, b, c, d, e, f, out);
}
