import { vecLerp, vecReset } from "../../functions/vecFunctions";
import { expectVecEqualsApprox } from "../helpers";

describe("vecLerp", () => {
  it("(0,0), (1,0), 0 => (0,0)", () => {
    expectVecEqualsApprox(vecLerp(vecReset(0, 0), vecReset(1, 0), 0), vecReset(0, 0));
  });

  it("(0,0), (1,0), 0.5 => (0.5,0)", () => {
    expectVecEqualsApprox(vecLerp(vecReset(0, 0), vecReset(1, 0), 0.5), vecReset(0.5, 0));
  });

  it("(0,0), (1,0), 1 => (1,0)", () => {
    expectVecEqualsApprox(vecLerp(vecReset(0, 0), vecReset(1, 0), 1), vecReset(1, 0));
  });

  it("(4,4), (4,4), 0 => (4,4)", () => {
    expectVecEqualsApprox(vecLerp(vecReset(4, 4), vecReset(4, 4), 0), vecReset(4, 4));
  });

  it("(4,4), (4,4), 2 => (4,4)", () => {
    expectVecEqualsApprox(vecLerp(vecReset(4, 4), vecReset(4, 4), 2), vecReset(4, 4));
  });

  it("(10,10), (20,30), 0.75 => (17.5,25)", () => {
    expectVecEqualsApprox(vecLerp(vecReset(10, 10), vecReset(20, 30), 0.75), vecReset(17.5, 25));
  });

  it("(0,0), (1,1), NaN => (NaN,NaN)", () => {
    expectVecEqualsApprox(vecLerp(vecReset(0, 0), vecReset(1, 1), NaN), vecReset(NaN, NaN));
  });

  it("(0,0), (0,0), NaN => (NaN,NaN)", () => {
    expectVecEqualsApprox(vecLerp(vecReset(0, 0), vecReset(0, 0), NaN), vecReset(NaN, NaN));
  });
});
