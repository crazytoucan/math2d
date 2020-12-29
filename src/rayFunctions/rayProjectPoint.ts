import { _dot } from "../internal/_dot";
import { IRay, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Projects a point onto the given line, returning the distance _t_ along the line where it falls.
 *
 * This function basically computes the dot product of the relative vector from the line's initial
 * point to the given point.
 *
 * @param ray line to inspect
 * @param point point to project onto the line
 * @param out
 */
export function rayProjectPoint(ray: IRay, point: IVec, out = vecAlloc()) {
  const t = _dot(ray, point);
  return vecReset(ray.x0 + t * ray.dirX, ray.y0 + t * ray.dirY, out);
}
