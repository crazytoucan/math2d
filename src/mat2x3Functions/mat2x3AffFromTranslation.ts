import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";
/**
 * Computes the affine transform corresponding to a given (tx, ty) translation
 *
 * @param tx the x translation component
 * @param ty the y translation component
 * @param out
 * @see {@link mat2x3AffFromRotation}
 * @see {@link mat2x3AffTranslate}
 * @see {@link mat2x3AffReset}
 */
export function mat2x3AffFromTranslation(tx: number, ty: number, out = mat2x3Alloc()) {
  return mat2x3Reset(1, 0, 0, 1, tx, ty, out);
}
