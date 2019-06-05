import { _dotPerp } from "../internal/_dotPerp";
import { EPSILON } from "../internal/const";
import { ILine, IVec } from "../types";

/**
 * Determines if the point is on the line
 *
 * This function tests whether the point lies along the line's geometry,
 * using allowed error _ε_ = 1e-8.
 *
 * @param line the line to inspect
 * @param point the point to check whether it's on the line
 * @see {@link rayContainsPoint}
 * @see {@link lineWhichSide}
 */
export function lineContainsPoint(line: ILine, point: IVec) {
  return Math.abs(_dotPerp(line, point)) < EPSILON;
}
