import { _lookAt } from "../internal/_lookAt";
import { IVec } from "../types";
import { lineAlloc } from "./lineAlloc";

/**
 * Construct a line that passes through two given points.
 *
 * The constructed line will have its initial point set to the given `from` point,
 * and its direction initialized to pass through the `to` point (on the positive side
 * of the line, i.e. _t_ > 0). The direction vector will be properly normalized even if
 * the `from` and `to` points are not one unit apart.
 *
 * If the two points are the same, the returned line will have the same initial point as
 * the `from` argument and a (NaN, NaN) direction vector.
 *
 * @param from the first point to pass through
 * @param to the second point to pass through
 * @param out
 */
export function lineThroughPoints(from: IVec, to: IVec, out = lineAlloc()) {
  return _lookAt(from.x, from.y, to.x, to.y, out);
}
