import { vecNormalize, vecReset } from "../../functions/vecFunctions";
import { expectVecEqualsApprox } from "../helpers";

describe("vecNormalize", () => {
  it("(0.6,-0.8) => (0.6,-0.8)", () => {
    expectVecEqualsApprox(vecNormalize(vecReset(0.6, -0.8)), 0.6, -0.8);
  });

  it("(0.3,-0.4) => (0.6,-0.8)", () => {
    expectVecEqualsApprox(vecNormalize(vecReset(0.3, -0.4)), 0.6, -0.8);
  });

  it("(-20,21) => (-20/29,21/29)", () => {
    expectVecEqualsApprox(vecNormalize(vecReset(-20, 21)), -20 / 29, 21 / 29);
  });

  it("(0,0) => (NaN,NaN)", () => {
    expectVecEqualsApprox(vecNormalize(vecReset(0, 0)), NaN, NaN);
  });

  it("(NaN,NaN) => (NaN,NaN)", () => {
    expectVecEqualsApprox(vecNormalize(vecReset(NaN, NaN)), NaN, NaN);
  });
});
