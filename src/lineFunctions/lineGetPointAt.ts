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
 * @param line the line to inspect
 * @param t distance along the line at which to compute point
 * @param out
 * @see {@link ILine}
 * @see {@link lineGetPointAt}
 */
export function lineGetPointAt(line: ILine, t: number, out = vecAlloc()) {
  return vecReset(line.x0 + t * line.dirX, line.y0 + t * line.dirY, out);
}
