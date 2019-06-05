import { mat2x3Alloc } from "./mat2x3Alloc";

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
 * @see {@link IMat2x3}
 * @see {@link mat2x3Alloc}
 * @see {@link mat2x3Clone}
 */
export function mat2x3Reset(a: number, b: number, c: number, d: number, e: number, f: number, out = mat2x3Alloc()) {
  out.a = a;
  out.b = b;
  out.c = c;
  out.d = d;
  out.e = e;
  out.f = f;
  return out;
}
