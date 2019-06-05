import { IMat2x3 } from "../types";

/**
 * Returns whether the matrix corresponds to only a translation.
 *
 * Affine translation matrices have the form
 *
 * ```
 * ⎡1 0 tx⎤
 * ⎣0 1 ty⎦
 * ```
 *
 * @param mat the matrix to inspect
 * @see {@link mat2x3AffIsOrthogonal}
 */
export function mat2x3AffIsTranslationOnly(mat: IMat2x3) {
  return mat.a === 1 && mat.b === 0 && mat.c === 0 && mat.d === 1;
}
