import { mat2x3AffDeterminant, mat2x3AffIdentity, mat2x3Reset } from "../../functions/mat2x3Functions";

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
