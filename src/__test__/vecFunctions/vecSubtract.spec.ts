import { vecReset, vecSubtract } from "../../functions/vecFunctions";
import { expectVecEqualsApprox } from "../helpers";

describe("vecSubtract", () => {
  it("(4,5) - (20,30) => (-16,-25)", () => {
    expectVecEqualsApprox(vecSubtract(vecReset(4, 5), vecReset(20, 30)), -16, -25);
  });
});
