import { lineAlloc } from "./lineAlloc";

/**
 * Construct a new line given an (x0, y0) initial point and (dirX, dirY) direction vector.
 *
 * This function creates a new line from given values. The (dirX, dirY) values given should
 * describe a unit vector: no checks or operations are done internally to guarantee that is so.
 *
 * @param x0 x-coordinate of the line's initial point
 * @param y0 y-coordinate of the line's initial point
 * @param dirX x-coordinate of the line's direction vector, which should form a unit vector
 *  along with the provided `dirY`
 * @param dirY y-coordinate of the line's direction vector, which should form a unit vector
 *  along with the provided `dirX`
 * @param out
 * @see {@link ILine}
 * @see {@link lineAlloc}
 * @see {@link lineClone}
 */
export function lineReset(x0: number, y0: number, dirX: number, dirY: number, out = lineAlloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.dirX = dirX;
  out.dirY = dirY;
  return out;
}
