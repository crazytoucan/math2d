import { IBox, IVec } from "../types";

/**
 * Determines whether the box contains a given point.
 *
 * Checks whether the point is inside the box's enclosed region.
 * The box is treated as a closed area,
 * so points on the boundary of the box will return true.
 *
 * @param box
 * @param point
 */
export function boxContainsPoint(box: IBox, point: IVec) {
  return point.x >= box.minX && point.y >= box.minY && point.x <= box.maxX && point.y <= box.maxY;
}
