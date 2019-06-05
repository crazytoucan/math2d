import { IMat2x3 } from "../types";

/**
 * Computes the determinant of the affine matrix
 *
 * The determinant in 2D space is given by `a * d - b * c`.
 *
 * @param mat matrix to take determinant of
 */
export function mat2x3AffDeterminant(mat: IMat2x3) {
  return mat.a * mat.d - mat.b * mat.c;
}
