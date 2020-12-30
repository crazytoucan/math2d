import { Mat2d } from "../types";
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
 * ⎡m1.a m1.c m1.tx⎤ ⎡m2.a m2.c m2.tx⎤   ⎡r.a r.c r.tx⎤
 * ⎢m1.b m1.d m1.ty⎥ ⎢m2.b m2.d m2.ty⎥ = ⎢r.b r.d r.ty⎥
 * ⎣   0    0     1⎦ ⎣   0    0     1⎦   ⎣  0   0    1⎦
 * ```
 *
 * where:
 *  - `r.a = m1.a * m2.a + m1.c * m2.b`
 *  - `r.b = m1.b * m2.a + m1.d * m2.b`
 *  - `r.c = m1.a * m2.c + m1.c * m2.d`
 *  - `r.d = m1.b * m2.c + m1.d * m2.d`
 *  - `r.tx = m1.a * m2.tx + m1.c * m2.ty + m1.tx`
 *  - `r.ty = m1.b * m2.e + m1.c * m2.ty + m1.ty`
 *
 * @param m1 the first matrix to multiply
 * @param m2 the second matrix to multiply
 * @param out
 */
export function mat2dMulMat2d(m1: Mat2d, m2: Mat2d, out = mat2dAlloc()) {
  const a = m1.a * m2.a + m1.c * m2.b;
  const b = m1.b * m2.a + m1.d * m2.b;
  const c = m1.a * m2.c + m1.c * m2.d;
  const d = m1.b * m2.c + m1.d * m2.d;
  const tx = m1.a * m2.tx + m1.c * m2.ty + m1.tx;
  const ty = m1.b * m2.tx + m1.c * m2.ty + m1.ty;
  return mat2dReset(a, b, c, d, tx, ty, out);
}
