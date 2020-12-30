import { EPSILON } from "../internal/const";
import { _dotPerp } from "../internal/_dotPerp";
import { Ray, Vec } from "../types";

/**
 * Computes on which side of the ray (as a _line_) a given point lies.
 *
 * This method returns one of four possible values:
 *
 * - `0`, if the point lies exactly along the line
 * - `1`, if the point lies in the halfplane defined by its direction vector sweeping in the x+ to y+ direction
 *   ("left" side, or counter-clockwise in the standard Cartesian coordinate system)
 * - `-1`, if the point lies in the halfplane defined by its direction vector sweeping in the x+ to y- direction
 *   ("right" side, or clockwise in the standard Cartesian coordinate system)
 * - `NaN`, if either of the point's coordinates or any of the line's components are NaN.
 *
 * This measures the perpendicular distance of the point to the line's
 * direction vector. A _positive_ return value means that the point lies on the side of the line
 * rotated from its direction vector in the x+ to y+ direction ("left" or counter-clockwise in the
 * standard Cartesian coordinate system), while a _negative_ return value means it lies in the other half-plane
 * ("right" or clockwise in the standard Cartesian coordinate system).
 *
 * If the point lies on the line, this function returns 0.
 *
 * @param ray the line to inspect
 * @param point the reference point to check for closest distance
 */
export function rayWhichSide(ray: Ray, point: Vec) {
  const d = _dotPerp(ray, point);
  return Math.abs(d) < EPSILON ? 0 : Math.sign(d);
}
