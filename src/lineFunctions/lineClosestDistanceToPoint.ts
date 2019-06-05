import { _dotPerp } from "../internal/_dotPerp";
import { ILine, IVec } from "../types";

/**
 * Determines the closest distance the line comes to a given point
 *
 * This measures the perpendicular distance of the point to the line's
 * direction vector. If the point lies on the line, this function returns 0.
 *
 * To get the signed distance of the point to the line, which additionally
 * encodes which half-plane the point lies within, see
 * {@link lineClosestSignedDistanceToPoint}.
 *
 * @param line the line to inspect
 * @param point the reference point to check for closest distance
 * @see {@link lineGetClosestSignedDistanceToPoint}
 */
export function lineClosestDistanceToPoint(line: ILine, point: IVec) {
  return Math.abs(_dotPerp(line, point));
}
