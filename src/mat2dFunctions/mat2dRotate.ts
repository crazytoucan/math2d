import { Mat2d } from "../types";
import { mat2dAlloc } from "./mat2dAlloc";
import { mat2dReset } from "./mat2dReset";

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
 * __see {@link mat2dFromRotation}
 * __see {@link mat2dMulMat2d}
 */
export function mat2dRotate(mat: Mat2d, theta: number, out = mat2dAlloc()) {
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  return mat2dReset(
    cos * mat.a - sin * mat.c,
    cos * mat.b - sin * mat.d,
    sin * mat.a + cos * mat.c,
    sin * mat.b + cos * mat.d,
    mat.e,
    mat.f,
    out,
  );
}
