import { mat2dIdentity } from "../../mat2dFunctions/mat2dIdentity";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { vecReset } from "../../vecFunctions/vecReset";
import { vecTransformBy } from "../../vecFunctions/vecTransformBy";
import { expectVecEqualsApprox } from "../helpers";

describe("vecTransformBy", () => {
  it("[1 0 0 1 0 0](3, 4) => (3, 4)", () => {
    expectVecEqualsApprox(vecTransformBy(vecReset(3, 4), mat2dIdentity()), vecReset(3, 4));
  });

  it("[2 0 0 2 10 20](3, 4) => (16,28)", () => {
    expectVecEqualsApprox(vecTransformBy(vecReset(3, 4), mat2dReset(2, 0, 0, 2, 10, 20)), vecReset(16, 28));
  });

  it("[0 -1 1 0 10 20](3, 4) => (14,17)", () => {
    expectVecEqualsApprox(vecTransformBy(vecReset(3, 4), mat2dReset(0, -1, 1, 0, 10, 20)), vecReset(14, 17));
  });
});
