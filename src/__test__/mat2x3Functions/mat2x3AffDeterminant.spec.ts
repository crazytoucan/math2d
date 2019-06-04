import { mat2x3AffDeterminant } from "../../mat2x3Functions/mat2x3AffDeterminant";
import { mat2x3AffIdentity } from "../../mat2x3Functions/mat2x3AffIdentity";
import { mat2x3Reset } from "../../mat2x3Functions/mat2x3Reset";

describe("mat2x3AffDeterminant", () => {
  it("|1 0 0 1 0 0| => 1", () => {
    expect(mat2x3AffDeterminant(mat2x3AffIdentity())).toBe(1);
  });

  it("|2 0 0 2 10 10| => 4", () => {
    expect(mat2x3AffDeterminant(mat2x3Reset(2, 0, 0, 2, 10, 10))).toBe(4);
  });

  it("|4 -7 8 5 NaN NaN| => 76", () => {
    expect(mat2x3AffDeterminant(mat2x3Reset(4, -7, 8, 5, NaN, NaN))).toBe(76);
  });
});
