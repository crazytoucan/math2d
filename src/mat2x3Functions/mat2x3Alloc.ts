import { IMat2x3 } from "../types";

class Mat2x3 implements IMat2x3 {
  constructor(public a = NaN, public b = NaN, public c = NaN, public d = NaN, public e = NaN, public f = NaN) {}
}

export function mat2x3Alloc(): IMat2x3 {
  return new Mat2x3();
}
