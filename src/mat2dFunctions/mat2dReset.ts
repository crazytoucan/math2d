import { mat2dAlloc } from "./mat2dAlloc";

/**
 * Construct a new matrix given component values.
 *
 * The resulting matrix will have the shape
 *
 * ```
 * ⎡a c tx⎤
 * ⎣b d ty⎦
 * ```
 *
 * @param a col 1, row 1 component, usually called `m11` in a 4x4 graphics matrix
 * @param b col 1, row 2 component, usually called `m12` in a 4x4 graphics matrix
 * @param c col 2, row 1 component, usually called `m21` in a 4x4 graphics matrix
 * @param d col 2, row 2 component, usually called `m22` in a 4x4 graphics matrix
 * @param tx col 3, row 1 component, usually called `m41` in a 4x4 graphics matrix
 * @param ty col 3, row 2 component, usually called `m42` in a 4x4 graphics matrix
 * @param out
 */
export function mat2dReset(a: number, b: number, c: number, d: number, tx: number, ty: number, out = mat2dAlloc()) {
  out.a = a;
  out.b = b;
  out.c = c;
  out.d = d;
  out.tx = tx;
  out.ty = ty;
  return out;
}
