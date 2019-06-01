import { vecAlloc } from "../../functions/vecFunctions";
import { expectVecEqualsApprox } from "../helpers";

describe("vecAlloc", () => {
  it("returns (NaN, NaN)", () => {
    expectVecEqualsApprox(vecAlloc(), NaN, NaN);
  });
});
