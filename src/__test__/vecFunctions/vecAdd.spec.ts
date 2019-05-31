import { vecAdd, vecReset } from "../../functions/vecFunctions";
import { expectVecEqualsApprox } from "../helpers";

describe("vecAdd", () => {
  it("(4,5) + (20,30) => (24,35)", () => {
    expectVecEqualsApprox(vecAdd(vecReset(4, 5), vecReset(20, 30)), 24, 35);
  });
});
