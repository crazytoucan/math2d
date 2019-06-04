import { IBox, IVec } from "../types";
import { boxAlloc } from "./boxAlloc";
import { boxReset } from "./boxReset";

/**
 * Grows the box to include a given point.
 *
 * Extends the box's bounding edges, if needed, to encapsulate the given point.
 * If the point is already inside the box, this function does nothing.
 *
 * @param box the box to potentially grow
 * @param point the point that the box should grow to include
 * @param out
 */
export function boxEncapsulate(box: IBox, point: IVec, out = boxAlloc()) {
  return boxReset(
    Math.min(box.minX, point.x),
    Math.min(box.minY, point.y),
    Math.max(box.maxX, point.x),
    Math.max(box.maxY, point.y),
    out,
  );
}
