import { IMat2x3 } from "../types";
import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

/**
 * Applies a scaling transform on top of the given affine matrix, returning the result.
 *
 * This is equivalent to _left_-multiplying the matrix by a scaling transform; that is,
 * the result of this function is equivalent to a transform that first applies the matrix _mat_
 * and then scales in both the x- and y-directions according to _scale_.
 *
 * @param mat the matrix to transform
 * @param theta rotation angle in radians to apply on top of the given matrix
 * @param out
 * @see {@link mat2x3AffFromRotation}
 * @see {@link mat2x3AffMulMat2x3Aff}
 */
export function mat2x3AffScale(mat: IMat2x3, scale: number, out = mat2x3Alloc()) {
  return mat2x3Reset(scale * mat.a, scale * mat.b, scale * mat.c, scale * mat.d, scale * mat.e, scale * mat.f, out);
}
