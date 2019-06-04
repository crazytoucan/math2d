import { EPSILON, EPSILON_SQ } from "../internal/parameters";
import { IMat2x3 } from "../types";

export function mat2x3AffIsOrthogonal(mat: IMat2x3) {
  const d1Sq = mat.a * mat.a + mat.b * mat.b;
  const d2Sq = mat.c * mat.c + mat.d * mat.d;
  const dot = mat.a * mat.c + mat.b * mat.d;
  return Math.abs(d1Sq - 1) < EPSILON_SQ && Math.abs(d2Sq - 1) < EPSILON_SQ && Math.abs(dot) < EPSILON;
}
