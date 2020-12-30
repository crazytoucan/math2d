// tslint:disable:no-bitwise
import { Out } from "../const";
import { IBox, IVec } from "../types";

/**
 * Determines where the specified point lies in relation to the given box.
 *
 * The returned value is a binary OR of the possible values
 * {@link Out.MIN_X}, {@link Out.MAX_X}, {@link Out.MIN_Y}, and {@link Out.MAX_Y}
 * indicating, for each side, whether the point lies beyond that edge. If the point
 * is inside the box, this function returns the value 0.
 *
 * @param box
 * @param point
 * @example
 *  const myBox = boxReset(-2, -2, 2, 2);
 *  const outCode1 = boxGetOutCode(myBox, vecReset(-4, 4)); // returns Out.MIN_X | Out.MAX_Y
 *  const outCode2 = boxGetOutCode(myBox, vec2Origin()); // returns 0
 * __see Out.MIN_X
 * __see Out.MAX_X
 * __see Out.MIN_Y
 * __see Out.MAX_Y
 */
export function boxGetOutCode(box: IBox, point: IVec) {
  let out = 0;
  if (point.x < box.minX) {
    out |= Out.MIN_X;
  } else if (point.x > box.maxX) {
    out |= Out.MAX_X;
  }

  if (point.y < box.minY) {
    out |= Out.MIN_Y;
  } else if (point.y > box.maxY) {
    out |= Out.MAX_Y;
  }

  return out;
}
