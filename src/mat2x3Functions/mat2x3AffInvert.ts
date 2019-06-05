import { EPSILON } from "../internal/const";
import { IMat2x3 } from "../types";
import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

/**
 * Computes the inverse of the given 2x3 affine matrix
 *
 * @param mat the matrix to invert
 * @param out
 */
export function mat2x3AffInvert(mat: IMat2x3, out = mat2x3Alloc()) {
  const det = mat.a * mat.d - mat.b * mat.c;
  if (det > -EPSILON && det < EPSILON) {
    return mat2x3Reset(NaN, NaN, NaN, NaN, NaN, NaN, out);
  } else {
    const detInverse = 1 / det;
    return mat2x3Reset(
      detInverse * mat.d,
      -detInverse * mat.b,
      -detInverse * mat.c,
      detInverse * mat.a,
      detInverse * (mat.c * mat.f - mat.d * mat.e),
      detInverse * (mat.b * mat.e - mat.a * mat.f),
      out,
    );
  }
}
