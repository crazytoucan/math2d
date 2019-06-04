// tslint:disable:no-bitwise
import { OUT_MAX_X, OUT_MAX_Y, OUT_MIN_X, OUT_MIN_Y } from "../const";
import { IBox, IVec } from "../types";

/**
 * Determines where the specified point lies in relation to the given box.
 *
 * The returned value is a binary OR of the possible values
 * {@link OUT_MIN_X}, {@link OUT_MAX_X}, {@link OUT_MIN_Y}, and {@link OUT_MAX_Y}
 * indicating, for each side, whether the point lies beyond that edge. If the point
 * is inside the box, this function returns the value 0.
 *
 * @param box
 * @param point
 * @example
 *  const myBox = boxReset(-2, -2, 2, 2);
 *  const outCode1 = boxComputeOutCode(myBox, vecReset(-4, 4)); // returns OUT_MIN_X | OUT_MAX_Y
 *  const outCode2 = boxComputeOutCode(myBox, vec2Origin()); // returns 0
 * @see OUT_MIN_X
 * @see OUT_MAX_X
 * @see OUT_MIN_Y
 * @see OUT_MAX_Y
 */
export function boxComputeOutCode(box: IBox, point: IVec) {
  let out = 0;
  if (point.x < box.minX) {
    out |= OUT_MIN_X;
  } else if (point.x > box.maxX) {
    out |= OUT_MAX_X;
  }

  if (point.y < box.minY) {
    out |= OUT_MIN_Y;
  } else if (point.y > box.maxY) {
    out |= OUT_MAX_Y;
  }

  return out;
}
