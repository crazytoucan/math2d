import { IMat2x3 } from "../types";
import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

/**
 * Applies a translation on top of the given matrix, returning the result.
 *
 * This is equivalent to _left_-multiplying the matrix by a translation transform; that is,
 * the result of this function is equivalent to a transform that first applies the matrix _mat_
 * and then translates according to (+tx, +ty).
 *
 * @param mat the matrix to transform
 * @param tx x-component of the translation to apply
 * @param ty y-component of the translation to apply
 * @param out
 * @see {@link mat2x3AffFromTranslation}
 * @see {@link mat2x3AffMulMat2x3Aff}
 */
export function mat2x3AffTranslate(mat: IMat2x3, tx: number, ty: number, out = mat2x3Alloc()) {
  return mat2x3Reset(mat.a, mat.b, mat.c, mat.d, mat.e + tx, mat.f + ty, out);
}
