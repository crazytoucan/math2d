import { ILine } from "../types";

class Line implements ILine {
  constructor(public x0 = NaN, public y0 = NaN, public dirX = NaN, public dirY = NaN) {}
}

export function lineAlloc(): ILine {
  return new Line();
}
