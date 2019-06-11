import { IMat2d } from "../types";

/**
 * Computes the determinant of the affine matrix
 *
 * The determinant in 2D space is given by `a * d - b * c`.
 *
 * @param mat matrix to take determinant of
 */
export function mat2dDeterminant(mat: IMat2d) {
  return mat.a * mat.d - mat.b * mat.c;
}
