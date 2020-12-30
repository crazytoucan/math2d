import { Box } from "../types";
import { boxAlloc } from "./boxAlloc";
import { boxReset } from "./boxReset";

/**
 * Copies values from an existing IBox into a new box.
 *
 * @param box source to copy values from
 * @param out destination box to copy values to
 *
 * @example
 *  // make a copy of a given box
 *  const myBox = boxReset(-1, -1, 1, 1);
 *  const myBoxCopy = boxClone(myBox);
 *
 *  // copy a given box into preallocated memory
 *  const TMP_BOX = boxAlloc();
 *  boxClone(myBox, TMP_BOX);
 */
export function boxClone(box: Box, out = boxAlloc()) {
  return boxReset(box.minX, box.minY, box.maxX, box.maxY, out);
}
