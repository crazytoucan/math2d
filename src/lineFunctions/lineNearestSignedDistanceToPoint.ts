import { _dot } from "../internal/_dot";
import { _dotPerp } from "../internal/_dotPerp";
import { nearestPointResultAlloc } from "../nearestPointResultFunctions/nearestPointResultAlloc";
import { nearestPointResultReset } from "../nearestPointResultFunctions/nearestPointResultReset";
import { ILine, IVec } from "../types";

/**
 * Determines the closest _signed_ distance the line comes to a given point
 *
 * This measures the perpendicular distance of the point to the line's
 * direction vector. A _positive_ return value means that the point lies on the side of the line
 * rotated from its direction vector in the x+ to y+ direction ("left" or counter-clockwise in the
 * standard Cartesian coordinate system), while a _negative_ return value means it lies in the other half-plane
 * ("right" or clockwise in the standard Cartesian coordinate system).
 *
 * If the point lies on the line, this function returns 0.
 *
 * To get the (unsigned) distance of the point to the line, see
 * {@link lineNearestSignedDistanceToPoint}.
 *
 * @param line the line to inspect
 * @param point the reference point to check for closest distance
 * @see {@link lineGetClosestDistanceToPoint}
 * @see {@link lineWhichSide}
 * @see {@link INearestPointResult}
 */
export function lineNearestSignedDistanceToPoint(line: ILine, point: IVec, out = nearestPointResultAlloc()) {
  const t = _dot(line, point);
  const signedDistance = _dotPerp(line, point);
  return nearestPointResultReset(line.x0 + t * line.dirX, line.y0 + t * line.dirY, t, signedDistance, out);
}
