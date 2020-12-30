import { Mat2d } from "../types";
import { mat2dAlloc } from "./mat2dAlloc";
import { mat2dReset } from "./mat2dReset";

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
 * __see {@link mat2dFromTranslation}
 * __see {@link mat2dMulMat2d}
 */
export function mat2dTranslate(mat: Mat2d, tx: number, ty: number, out = mat2dAlloc()) {
  return mat2dReset(mat.a, mat.b, mat.c, mat.d, mat.e + tx, mat.f + ty, out);
}
