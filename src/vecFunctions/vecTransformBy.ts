import { Mat2d, Vec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Multiplies the vector by an affine matrix.
 *
 * This computes a left multiplication of the vector by a matrix, i.e. _M_ × _v_.
 *
 * Per usual linear algebra rules, multiplying the vector `(x, y)` according to an affine matrix
 * `[a b c d e f]` is defined by:
 *
 * ```
 * ⎡a c tx⎤ ⎛x⎞   ⎛ax + cy + tx⎞
 * ⎢b d ty⎥ ⎜y⎟ = ⎜bx + dy + ty⎟
 * ⎣0 0  1⎦ ⎝1⎠   ⎝      1     ⎠
 * ```
 *
 * @param v the vector to transform
 * @param mat the matrix to multiply this vector by
 * @param out
 * __see {@link Imat2d}
 * __see {@link vecAdd}
 */
export function vecTransformBy(v: Vec, mat: Mat2d, out = vecAlloc()) {
  return vecReset(mat.a * v.x + mat.c * v.y + mat.tx, mat.b * v.x + mat.d * v.y + mat.ty, out);
}
