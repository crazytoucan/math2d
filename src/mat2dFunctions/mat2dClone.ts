import { Mat2d } from "../types";
import { mat2dAlloc } from "./mat2dAlloc";
import { mat2dReset } from "./mat2dReset";

/**
 * Copies the values from the given matrix into a new matrix.
 *
 * @param mat the matrix to copy
 * @param out
 */
export function mat2dClone(mat: Mat2d, out = mat2dAlloc()) {
  return mat2dReset(mat.a, mat.b, mat.c, mat.d, mat.e, mat.f, out);
}
