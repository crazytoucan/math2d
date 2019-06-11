import { IMat2d } from "../types";
import { mat2dAlloc } from "./mat2dAlloc";
import { mat2dReset } from "./mat2dReset";

/**
 * Applies a scaling transform on top of the given affine matrix, returning the result.
 *
 * Multiplies all components of the matrix by a given scalar value.
 *
 * This is equivalent to _left_-multiplying the matrix by a scaling transform; that is,
 * the result of this function is equivalent to a transform that first applies the matrix _mat_
 * and then scales in both the x- and y-directions according to _scale_.
 *
 * @param mat the matrix to transform
 * @param theta rotation angle in radians to apply on top of the given matrix
 * @param out
 * @see {@link mat2dMulMat2d}
 */
export function mat2dScale(mat: IMat2d, scale: number, out = mat2dAlloc()) {
  return mat2dReset(scale * mat.a, scale * mat.b, scale * mat.c, scale * mat.d, scale * mat.e, scale * mat.f, out);
}
