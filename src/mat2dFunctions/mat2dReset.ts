import { mat2dAlloc } from "./mat2dAlloc";

/**
 * Construct a new matrix given component values.
 *
 * The resulting matrix will have the shape
 *
 * ```
 * ⎡a c e⎤
 * ⎣b d f⎦
 * ```
 *
 * @param a col 1, row 1 component, usually called `m11` in a 4x4 graphics matrix
 * @param b col 1, row 2 component, usually called `m12` in a 4x4 graphics matrix
 * @param c col 2, row 1 component, usually called `m21` in a 4x4 graphics matrix
 * @param d col 2, row 2 component, usually called `m22` in a 4x4 graphics matrix
 * @param e col 3, row 1 component, usually called `tx` or `m41` in a 4x4 graphics matrix
 * @param f col 3, row 2 component, usually called `ty` or `m42` in a 4x4 graphics matrix
 * @param out
 * __see {@link Imat2d}
 * __see {@link mat2dAlloc}
 * __see {@link mat2dClone}
 */
export function mat2dReset(a: number, b: number, c: number, d: number, e: number, f: number, out = mat2dAlloc()) {
  out.a = a;
  out.b = b;
  out.c = c;
  out.d = d;
  out.tx = e;
  out.ty = f;
  return out;
}
