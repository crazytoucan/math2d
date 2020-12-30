import { _lookAt } from "../internal/_lookAt";
import { Vec } from "../types";
import { rayAlloc } from "./rayAlloc";

/**
 * Constructs a ray from an initial point, pointing in the direction of a target point.
 *
 * This function initializes a ray with a given `from` initial point, and with a direction vector
 * that goes through the target `to` point. The direction vector will be normalized even if `from`
 * and `to` are not one unit apart.
 *
 * If `from` and `to` are the same point, the returned vector will still have the `from` initial
 * point but its direction vector will be (NaN, NaN).
 *
 * @param from initial point of the ray
 * @param to point that the ray should go through
 * @param out
 */
export function rayLookAt(from: Vec, to: Vec, out = rayAlloc()) {
  return _lookAt(from.x, from.y, to.x, to.y, out);
}
