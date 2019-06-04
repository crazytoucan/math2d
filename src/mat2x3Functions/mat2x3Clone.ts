import { IMat2x3 } from "../types";
import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

export function mat2x3Clone(mat: IMat2x3, out = mat2x3Alloc()) {
  return mat2x3Reset(mat.a, mat.b, mat.c, mat.d, mat.e, mat.f, out);
}
