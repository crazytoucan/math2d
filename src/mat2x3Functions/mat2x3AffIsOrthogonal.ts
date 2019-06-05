import { EPSILON, EPSILON_SQ } from "../internal/const";
import { IMat2x3 } from "../types";

/**
 * Returns whether the matrix is an orthogonal matrix.
 *
 * An orthogonal matrix is defined as one whose rows and columns are orthogonal unit vectors.
 * (For a 2x3 affine matrix, this is constrained to its first 2x2 submatrix, i.e. excluding the translation.)
 *
 * This is a useful property for a matrix because it means the transform preserves lengths and angles,
 * so in particular it preserves normals.
 *
 * @param mat the matrix to check for orthogonality
 * @see {@link mat2x3AffIsTranslationOnly}
 */
export function mat2x3AffIsOrthogonal(mat: IMat2x3) {
  const d1Sq = mat.a * mat.a + mat.b * mat.b;
  const d2Sq = mat.c * mat.c + mat.d * mat.d;
  const dot = mat.a * mat.c + mat.b * mat.d;
  return Math.abs(d1Sq - 1) < EPSILON_SQ && Math.abs(d2Sq - 1) < EPSILON_SQ && Math.abs(dot) < EPSILON;
}
