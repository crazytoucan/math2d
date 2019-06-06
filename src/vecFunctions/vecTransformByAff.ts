import { IMat2x3, IVec } from "../types";
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
 * ⎡a c e⎤ ⎛x⎞   ⎛ax + cy + e⎞
 * ⎢b d f⎥ ⎜y⎟ = ⎜bx + dy + f⎟
 * ⎣0 0 1⎦ ⎝1⎠   ⎝     1     ⎠
 * ```
 *
 * @param v the vector to transform
 * @param mat the matrix to multiply this vector by
 * @param out
 * @see {@link IMat2x3}
 * @see {@link vecAdd}
 */
export function vecTransformByAff(v: IVec, mat: IMat2x3, out = vecAlloc()) {
  return vecReset(mat.a * v.x + mat.c * v.y + mat.e, mat.b * v.x + mat.d * v.y + mat.f, out);
}
