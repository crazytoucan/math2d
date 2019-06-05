import { IMat2x3 } from "../types";
import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

/**
 * Applies a rotation in radians to the given matrix, returning the result.
 *
 * This is equivalent to _left_-multiplying the matrix by a rotation transform; that is,
 * the result of this function is equivalent to a transform that first applies the matrix _mat_
 * and then rotates according to the angle _theta_.
 *
 * The rotation is from the `x+` to `y+` direction, which is _counter-clockwise_ in the
 * standard Cartesian coordinate system or _clockwise_ in most standard graphics
 * coordinate systems, as in Canvas and the DOM.
 *
 * @param mat the matrix to transform
 * @param theta rotation angle in radians to apply on top of the given matrix
 * @param out
 * @see {@link mat2x3AffFromRotation}
 * @see {@link mat2x3AffMulMat2x3Aff}
 */
export function mat2x3AffRotate(mat: IMat2x3, theta: number, out = mat2x3Alloc()) {
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  return mat2x3Reset(
    cos * mat.a - sin * mat.c,
    cos * mat.b - sin * mat.d,
    sin * mat.a + cos * mat.c,
    sin * mat.b + cos * mat.d,
    mat.e,
    mat.f,
    out,
  );
}
