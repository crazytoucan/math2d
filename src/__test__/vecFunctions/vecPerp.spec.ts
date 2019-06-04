import { vecPerp } from "../../vecFunctions/vecPerp";
import { vecReset } from "../../vecFunctions/vecReset";
import { expectVecEqualsApprox } from "../helpers";

describe("vecPerp", () => {
  it("⟂(4,5) => (-5,4)", () => {
    expectVecEqualsApprox(vecPerp(vecReset(4, 5)), vecReset(-5, 4));
  });

  it("⟂(-2,-3) => (3,-2)", () => {
    expectVecEqualsApprox(vecPerp(vecReset(-2, -3)), vecReset(3, -2));
  });

  it("⟂(0,0) => (0,0)", () => {
    expectVecEqualsApprox(vecPerp(vecReset(0, 0)), vecReset(0, 0));
  });

  it("⟂(NaN,NaN) => (NaN,NaN)", () => {
    expectVecEqualsApprox(vecPerp(vecReset(NaN, NaN)), vecReset(NaN, NaN));
  });
});
