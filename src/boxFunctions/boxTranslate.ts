import { IBox } from "../types";
import { boxAlloc } from "./boxAlloc";
import { boxReset } from "./boxReset";

/**
 * Translate a box by an offset in the x- and y- directions.
 *
 * @param box the box to translate
 * @param tx the amount to translate in the x direction
 * @param ty the amount to translate in the y direction
 * @param out
 */
export function boxTranslate(box: IBox, tx: number, ty: number, out = boxAlloc()) {
  return boxReset(box.minX + tx, box.minY + ty, box.maxX + tx, box.maxY + ty, out);
}
