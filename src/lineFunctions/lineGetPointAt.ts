import { ILine } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Gets a point along the line, parameterized according to distance along its
 * direction vector.
 *
 * Retrieves a point on the line's geometry according to moving distance _t_
 * along the direction vector from its initial point.
 *
 * Synonymous to {@link rayGetPointAt}.
 *
 * @param ray
 * @param t
 * @param out
 * @see {@link rayGetPointAt}
 */
export function lineGetPointAt(line: ILine, t: number, out = vecAlloc()) {
  return vecReset(line.x0 + t * line.dirX, line.y0 + t * line.dirY, out);
}
