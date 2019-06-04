import { boxAlloc } from "./boxAlloc";

/**
 * Construct a new box given `minX`, `minY`, `maxX`, and `maxY` bounding values.
 *
 * @param minX
 *  min-X boundary of the box, which is typically the _left_ edge
 * @param minY
 *  min-Y boundary of the box, which could be the _top_ OR the _bottom_ edge of the box depending on how your
 *  rendering and coordinate systems are laid out.
 * @param maxX
 *  max-X boundary of the box, which is typically the _right_ edge
 * @param maxY
 *  min-Y boundary of the box, which could be the _top_ OR the _bottom_ edge of the box depending on how your
 *  rendering and coordinate systems are laid out.
 * @param out
 * @example
 *  // initialize a new box that's [-1, 1]×[-1, 1]
 *  const myBox = boxReset(-1, -1, 1, 1);
 *
 *  // reset an existing box's values to [4, 8]×[0, 8]
 *  const myBox2 = boxAlloc();
 *  boxReset(4, 0, 8, 8, myBox2);
 */
export function boxReset(minX: number, minY: number, maxX: number, maxY: number, out = boxAlloc()) {
  out.minX = minX;
  out.minY = minY;
  out.maxX = maxX;
  out.maxY = maxY;
  return out;
}
