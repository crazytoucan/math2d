import { Box } from "../types";
import { boxAlloc } from "./boxAlloc";
import { boxReset } from "./boxReset";

/**
 * Expands a box by a given amount in all directions.
 *
 * Forms a new box with bounding edges `[(minX - amount) (minY - amount) (maxX + amount) (maxY + amount)]`.
 *
 * The `amount` parameter is allowed to be negative, which effectively shrinks the box.
 *
 * @param box the box to grow
 * @param amount amount to expand from each edge. Is allowed to be negative.
 * @param out
 */
export function boxGrow(box: Box, amount: number, out = boxAlloc()) {
  return boxReset(box.minX - amount, box.minY - amount, box.maxX + amount, box.maxY + amount, out);
}
