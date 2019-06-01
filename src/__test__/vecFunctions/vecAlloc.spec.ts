import { vecAlloc, vecReset } from "../../functions/vecFunctions";
import { expectVecEqualsApprox } from "../helpers";

describe("vecAlloc", () => {
  it("returns (NaN, NaN)", () => {
    expectVecEqualsApprox(vecAlloc(), vecReset(NaN, NaN));
  });
});
