import { IMat2x3, IVec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Multiplies the vector by an affine matrix.
 *
 * Per usual linear algebra, multiplying the vector `vec = (x, y)` according to an affine matrix
 * `[a b c d e f]` is defined by:
 *
 * ```
 * ⎡a c e⎤ ⎛x⎞   ⎛ax + cy + e⎞
 * ⎢b d f⎥ ⎜y⎟ = ⎜bx + dy + f⎟
 * ⎣0 0 1⎦ ⎝1⎠   ⎝     1     ⎠
 * ```
 *
 * @param vec
 * @param mat
 * @param out
 */
export function vecTransformByAff(vec: IVec, mat: IMat2x3, out = vecAlloc()) {
  return vecReset(mat.a * vec.x + mat.c * vec.y + mat.e, mat.b * vec.x + mat.d * vec.y + mat.f, out);
}
