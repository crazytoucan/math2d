import { IMat2x3 } from "../types";

export function mat2x3AffDeterminant(mat: IMat2x3) {
  return mat.a * mat.d - mat.b * mat.c;
}
