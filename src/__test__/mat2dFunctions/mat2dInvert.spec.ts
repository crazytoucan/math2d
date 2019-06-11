import { mat2dIdentity } from "../../mat2dFunctions/mat2dIdentity";
import { mat2dInvert } from "../../mat2dFunctions/mat2dInvert";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { expectmat2dEqualsApprox } from "../helpers";

describe("mat2dInvert", () => {
  it("[1 0 0 1 0 0]⁻¹ => [1 0 0 1 0 0]", () => {
    expectmat2dEqualsApprox(mat2dInvert(mat2dIdentity()), mat2dReset(1, 0, 0, 1, 0, 0));
  });

  it("[1 0 0 1 -10 20]⁻¹ => [1 0 0 1 10 -20]", () => {
    expectmat2dEqualsApprox(mat2dInvert(mat2dReset(1, 0, 0, 1, -10, 20)), mat2dReset(1, 0, 0, 1, 10, -20));
  });

  it("[0.5 0 0 -0.25 0 0]⁻¹ => [2 0 0 -4 0 0]", () => {
    expectmat2dEqualsApprox(mat2dInvert(mat2dReset(0.5, 0, 0, -0.25, 0, 0)), mat2dReset(2, 0, 0, -4, 0, 0));
  });

  it("[0 0.5 -0.5 0 6 -8]⁻¹ => [0 -2 2 0 16 12]", () => {
    expectmat2dEqualsApprox(mat2dInvert(mat2dReset(0, 0.5, -0.5, 0, 6, -8)), mat2dReset(0, -2, 2, 0, 16, 12));
  });

  it("[4 4 4 4 6 8]⁻¹ => [NaN NaN NaN NaN NaN NaN]", () => {
    expectmat2dEqualsApprox(mat2dInvert(mat2dReset(4, 4, 4, 4, 6, 8)), mat2dReset(NaN, NaN, NaN, NaN, NaN, NaN));
  });

  it("[1 0 1 0 6 8]⁻¹ => [NaN NaN NaN NaN NaN NaN]", () => {
    expectmat2dEqualsApprox(mat2dInvert(mat2dReset(1, 0, 1, 0, 6, 8)), mat2dReset(NaN, NaN, NaN, NaN, NaN, NaN));
  });

  it("[3 12 -4 -16 0 0]⁻¹ => [NaN NaN NaN NaN NaN NaN]", () => {
    expectmat2dEqualsApprox(
      mat2dInvert(mat2dReset(3, 12, -4, -16, 0, 0)),
      mat2dReset(NaN, NaN, NaN, NaN, NaN, NaN),
    );
  });
});
