import { mat2dIdentity } from "../../mat2dFunctions/mat2dIdentity";
import { mat2dIsOrthogonal } from "../../mat2dFunctions/mat2dIsOrthogonal";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";

describe("mat2dIsOrthogonal", () => {
  it("[1 0 0 1 0 0] => true", () => {
    expect(mat2dIsOrthogonal(mat2dIdentity())).toBe(true);
  });

  it("[1 0 0 1 6 -8] => true", () => {
    expect(mat2dIsOrthogonal(mat2dReset(1, 0, 0, 1, 6, -8))).toBe(true);
  });

  it("[1 0 0 -1 0 0] => true", () => {
    expect(mat2dIsOrthogonal(mat2dReset(1, 0, 0, -1, 0, 0))).toBe(true);
  });

  it("[0.6 -0.8 0.8 0.6 0 0] => true", () => {
    expect(mat2dIsOrthogonal(mat2dReset(0.6, -0.8, 0.8, 0.6, 0, 0))).toBe(true);
  });

  it("[2 0 0 2 0 0] => false", () => {
    expect(mat2dIsOrthogonal(mat2dReset(2, 0, 0, 2, 0, 0))).toBe(false);
  });

  it("[2 0 0 0.5 0 0] => false", () => {
    expect(mat2dIsOrthogonal(mat2dReset(2, 0, 0, 0.5, 0, 0))).toBe(false);
  });

  it("[1 0 1 0 0 0] => false", () => {
    expect(mat2dIsOrthogonal(mat2dReset(1, 0, 1, 0, 0, 0))).toBe(false);
  });

  it("[NaN NaN NaN NaN 0 0] => false", () => {
    expect(mat2dIsOrthogonal(mat2dReset(NaN, NaN, NaN, NaN, 0, 0))).toBe(false);
  });
});
