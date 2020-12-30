import { EPSILON } from "../internal/const";
import { Mat2d } from "../types";
import { mat2dAlloc } from "./mat2dAlloc";
import { mat2dReset } from "./mat2dReset";

/**
 * Computes the inverse of the given 2d affine matrix
 *
 * @param mat the matrix to invert
 * @param out
 */
export function mat2dInvert(mat: Mat2d, out = mat2dAlloc()) {
  const det = mat.a * mat.d - mat.b * mat.c;
  if (det > -EPSILON && det < EPSILON) {
    return mat2dReset(NaN, NaN, NaN, NaN, NaN, NaN, out);
  } else {
    const detInverse = 1 / det;
    return mat2dReset(
      detInverse * mat.d,
      -detInverse * mat.b,
      -detInverse * mat.c,
      detInverse * mat.a,
      detInverse * (mat.c * mat.ty - mat.d * mat.tx),
      detInverse * (mat.b * mat.tx - mat.a * mat.ty),
      out,
    );
  }
}
