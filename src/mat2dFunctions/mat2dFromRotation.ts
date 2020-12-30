import { mat2dAlloc } from "./mat2dAlloc";
import { mat2dReset } from "./mat2dReset";

/**
 * Computes the affine transform corresponding to a given rotation, in radians
 *
 * Calculates the matrix that would yield a rotation of `theta` radians around the origin.
 * The rotation is from the `x+` to `y+` direction, which is _counter-clockwise_ in the
 * standard Cartesian coordinate system or _clockwise_ in most standard graphics
 * coordinate systems, as in Canvas and the DOM.
 *
 * @param theta angle in radians to create rotation for
 * @param out
 */
export function mat2dFromRotation(theta: number, out = mat2dAlloc()) {
  const sin = Math.sin(theta);
  const cos = Math.cos(theta);
  return mat2dReset(cos, -sin, sin, cos, 0, 0, out);
}
