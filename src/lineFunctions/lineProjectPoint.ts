import { _dot } from "../internal/_dot";
import { ILine, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Projects a point onto the given line, returning the distance _t_ along the line where it falls.
 *
 * This function basically computes the dot product of the relative vector from the line's initial
 * point to the given point.
 *
 * To find the closest point at which the line comes to the given point, which is the image
 * of the point projected onto the line, see {@link lineGetClosestPoint}.
 *
 * @param line line to inspect
 * @param point point to project onto the line
 * @param out
 */
export function lineProjectPoint(line: ILine, point: IVec, out = vecAlloc()) {
  const t = _dot(line, point);
  return vecReset(line.x0 + t * line.dirX, line.y0 + t * line.dirY, out);
}
