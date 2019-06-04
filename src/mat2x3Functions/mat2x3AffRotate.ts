import { IMat2x3 } from "../types";
import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

export function mat2x3AffRotate(mat: IMat2x3, theta: number, out = mat2x3Alloc()) {
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  return mat2x3Reset(
    cos * mat.a - sin * mat.c,
    cos * mat.b - sin * mat.d,
    sin * mat.a + cos * mat.c,
    sin * mat.b + cos * mat.d,
    mat.e,
    mat.f,
    out,
  );
}
