import { IMat2x3 } from "../types";
import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

export function mat2x3AffScale(mat: IMat2x3, scalar: number, out = mat2x3Alloc()) {
  return mat2x3Reset(scalar * mat.a, scalar * mat.b, scalar * mat.c, scalar * mat.d, mat.e, mat.f, out);
}
