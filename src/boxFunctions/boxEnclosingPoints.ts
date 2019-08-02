import { IVec, boxReset } from "..";

/**
 * Computes the smallest bounding box that contains all of the provided points.
 *
 * If the provided array is empty, this method returns a box with all values set
 * to `NaN`.
 *
 * @param points the points to contain
 */
export function boxEnclosingPoints(...points: IVec[]) {
  let minX: number = NaN;
  let maxX: number = NaN;
  let minY: number = NaN;
  let maxY: number = NaN;

  for (const point of points) {
    if (isNaN(minX) || point.x < minX) {
      minX = point.x;
    }
    if (isNaN(minY) || point.y < minY) {
      minY = point.y;
    }
    if (isNaN(maxX) || point.x > maxX) {
      maxX = point.x;
    }
    if (isNaN(maxY) || point.y > maxY) {
      maxY = point.y;
    }
  }

  return boxReset(minX, minY, maxX, maxY);
}
