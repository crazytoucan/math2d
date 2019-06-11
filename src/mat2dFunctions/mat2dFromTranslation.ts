import { mat2dAlloc } from "./mat2dAlloc";
import { mat2dReset } from "./mat2dReset";
/**
 * Computes the affine transform corresponding to a given (tx, ty) translation
 *
 * @param tx the x translation component
 * @param ty the y translation component
 * @param out
 * @see {@link mat2dFromRotation}
 * @see {@link mat2dTranslate}
 * @see {@link mat2dReset}
 */
export function mat2dFromTranslation(tx: number, ty: number, out = mat2dAlloc()) {
  return mat2dReset(1, 0, 0, 1, tx, ty, out);
}
