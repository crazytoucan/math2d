import { mat2dDeterminant } from "../../mat2dFunctions/mat2dDeterminant";
import { mat2dIdentity } from "../../mat2dFunctions/mat2dIdentity";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";

describe("mat2dDeterminant", () => {
  it("|1 0 0 1 0 0| => 1", () => {
    expect(mat2dDeterminant(mat2dIdentity())).toBe(1);
  });

  it("|2 0 0 2 10 10| => 4", () => {
    expect(mat2dDeterminant(mat2dReset(2, 0, 0, 2, 10, 10))).toBe(4);
  });

  it("|4 -7 8 5 NaN NaN| => 76", () => {
    expect(mat2dDeterminant(mat2dReset(4, -7, 8, 5, NaN, NaN))).toBe(76);
  });
});
