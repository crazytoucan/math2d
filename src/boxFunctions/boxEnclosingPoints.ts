import { IVec } from "../types";
import { boxAlloc } from "./boxAlloc";
import { boxReset } from "./boxReset";

/**
 * Computes the smallest bounding box that contains all of the provided points.
 *
 * If the provided array is empty, this method returns a box with `minX` and
 * `minY` set to `Infinity` and `maxX` and `maxY` set to `-Infinity`.
 *
 * @param points the points to contain
 * @param out
 */
export function boxEnclosingPoints(points: IVec[], out = boxAlloc()) {
  let minX: number = Infinity;
  let minY: number = Infinity;
  let maxX: number = -Infinity;
  let maxY: number = -Infinity;

  for (const point of points) {
    if (point.x < minX) {
      minX = point.x;
    }
    if (point.y < minY) {
      minY = point.y;
    }
    if (point.x > maxX) {
      maxX = point.x;
    }
    if (point.y > maxY) {
      maxY = point.y;
    }
  }

  return boxReset(minX, minY, maxX, maxY, out);
}
