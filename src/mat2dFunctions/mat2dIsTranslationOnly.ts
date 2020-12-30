import { Mat2d } from "../types";

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
 * __see {@link mat2dIsOrthogonal}
 */
export function mat2dIsTranslationOnly(mat: Mat2d) {
  return mat.a === 1 && mat.b === 0 && mat.c === 0 && mat.d === 1;
}
