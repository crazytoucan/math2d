import { Box } from "../types";
import { boxAlloc } from "./boxAlloc";
import { boxReset } from "./boxReset";

/**
 * Compute the smallest bounding box that contains both given boxes.
 *
 * For example, if one box contains the other, this method returns the larger box.
 * If the two boxes don't intersect, this method returns a bounding region that covers both boxes.
 *
 * @param a
 * @param b
 * @param out
 */
export function boxUnion(a: Box, b: Box, out = boxAlloc()) {
  return boxReset(
    Math.min(a.minX, b.minX),
    Math.min(a.minY, b.minY),
    Math.max(a.maxX, b.maxX),
    Math.max(a.maxY, b.maxY),
    out,
  );
}
