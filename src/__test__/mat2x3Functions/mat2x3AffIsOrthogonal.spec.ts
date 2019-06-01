import { mat2x3AffIdentity, mat2x3AffIsOrthogonal, mat2x3Reset } from "../../functions/mat2x3Functions";

describe("mat2x3AffIsOrthogonal", () => {
  it("[1 0 0 1 0 0] => true", () => {
    expect(mat2x3AffIsOrthogonal(mat2x3AffIdentity())).toBe(true);
  });

  it("[1 0 0 1 6 -8] => true", () => {
    expect(mat2x3AffIsOrthogonal(mat2x3Reset(1, 0, 0, 1, 6, -8))).toBe(true);
  });

  it("[1 0 0 -1 0 0] => true", () => {
    expect(mat2x3AffIsOrthogonal(mat2x3Reset(1, 0, 0, -1, 0, 0))).toBe(true);
  });

  it("[0.6 -0.8 0.8 0.6 0 0] => true", () => {
    expect(mat2x3AffIsOrthogonal(mat2x3Reset(0.6, -0.8, 0.8, 0.6, 0, 0))).toBe(true);
  });

  it("[2 0 0 2 0 0] => false", () => {
    expect(mat2x3AffIsOrthogonal(mat2x3Reset(2, 0, 0, 2, 0, 0))).toBe(false);
  });

  it("[2 0 0 0.5 0 0] => false", () => {
    expect(mat2x3AffIsOrthogonal(mat2x3Reset(2, 0, 0, 0.5, 0, 0))).toBe(false);
  });

  it("[1 0 1 0 0 0] => false", () => {
    expect(mat2x3AffIsOrthogonal(mat2x3Reset(1, 0, 1, 0, 0, 0))).toBe(false);
  });

  it("[NaN NaN NaN NaN 0 0] => false", () => {
    expect(mat2x3AffIsOrthogonal(mat2x3Reset(NaN, NaN, NaN, NaN, 0, 0))).toBe(false);
  });
});
