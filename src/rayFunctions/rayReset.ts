import { rayAlloc } from "./rayAlloc";

/**
 * Construct a new ray given an `x0`, `y0` initial point and `dirX`, `dirY` direction vector.
 *
 * This function creates a new ray from given values. The `(dirX, dirY)` values given should
 * describe a unit vector: no checks or operations are done internally to guarantee that is so.
 *
 * @param x0 x-coordinate of the ray's initial point
 * @param y0 y-coordinate of the ray's initial point
 * @param dirX x-coordinate of the ray's direction vector, which should form a unit vector
 *  along with the provided `dirY`
 * @param dirY y-coordinate of the ray's direction vector, which should form a unit vector
 *  along with the provided `dirX`
 * @param out
 * @see {@link IRay}
 * @see {@link rayAlloc}
 * @see {@link rayClone}
 */
export function rayReset(x0: number, y0: number, dirX: number, dirY: number, out = rayAlloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.dirX = dirX;
  out.dirY = dirY;
  return out;
}
