import { vecOrigin } from "../../vecFunctions/vecOrigin";
import { vecReset } from "../../vecFunctions/vecReset";
import { expectVecEqualsApprox } from "../helpers";

describe("vecOrigin", () => {
  it("returns (0,0)", () => {
    expectVecEqualsApprox(vecOrigin(), vecReset(0, 0));
  });
});
