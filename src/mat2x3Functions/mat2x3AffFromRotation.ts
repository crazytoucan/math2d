import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

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
 * @see {@link mat2x3AffFromTranslation}
 * @see {@link mat2x3AffRotate}
 * @see {@link mat2x3AffReset}
 */
export function mat2x3AffFromRotation(theta: number, out = mat2x3Alloc()) {
  const sin = Math.sin(theta);
  const cos = Math.cos(theta);
  return mat2x3Reset(cos, -sin, sin, cos, 0, 0, out);
}
