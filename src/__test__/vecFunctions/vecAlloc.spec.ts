import { vecAlloc } from "../../vecFunctions/vecAlloc";
import { vecReset } from "../../vecFunctions/vecReset";
import { expectVecEqualsApprox } from "../helpers";

describe("vecAlloc", () => {
  it("returns (NaN, NaN)", () => {
    expectVecEqualsApprox(vecAlloc(), vecReset(NaN, NaN));
  });
});
