import { IMat2x3 } from "../types";

export function mat2x3AffIsTranslationOnly(mat: IMat2x3) {
  return mat.a === 1 && mat.b === 0 && mat.c === 0 && mat.d === 1;
}
