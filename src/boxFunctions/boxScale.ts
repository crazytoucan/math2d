import { IBox } from "../types";
import { boxAlloc } from "./boxAlloc";
import { boxReset } from "./boxReset";

/**
 * Scales a box by a fixed scalar in both directions.
 *
 * @param box the box to scale
 * @param scalar the value by which to multiply all of the box's components
 * @param out
 */
export function boxScale(box: IBox, scalar: number, out = boxAlloc()) {
  return boxReset(box.minX * scalar, box.minY * scalar, box.maxX * scalar, box.maxY * scalar, out);
}
