import { lineReset } from "../lineFunctions/lineReset";
import { ILine } from "../types";
import { EPSILON_SQ } from "./const";

export function _lookAt(x0: number, y0: number, x1: number, y1: number, out: ILine) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const lenSq = dx * dx + dy * dy;
  if (lenSq < EPSILON_SQ) {
    return lineReset(x0, y0, NaN, NaN, out);
  } else {
    const lenInverse = 1 / Math.sqrt(lenSq);
    return lineReset(x0, y0, dx * lenInverse, dy * lenInverse, out);
  }
}
