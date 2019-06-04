import { vecAdd } from "../../vecFunctions/vecAdd";
import { vecReset } from "../../vecFunctions/vecReset";
import { expectVecEqualsApprox } from "../helpers";

describe("vecAdd", () => {
  it("(4,5) + (20,30) => (24,35)", () => {
    expectVecEqualsApprox(vecAdd(vecReset(4, 5), vecReset(20, 30)), vecReset(24, 35));
  });
});
