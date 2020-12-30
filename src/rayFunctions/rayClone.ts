import { Ray } from "../types";
import { rayAlloc } from "./rayAlloc";
import { rayReset } from "./rayReset";

/**
 * Copies the values from the given ray into a new ray.
 *
 * @param ray source ray from which values should be copied
 * @param out
 */
export function rayClone(ray: Ray, out = rayAlloc()) {
  return rayReset(ray.x0, ray.y0, ray.dirX, ray.dirY, out);
}
