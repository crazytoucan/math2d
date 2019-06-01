import { vecOrigin, vecReset } from "../../functions/vecFunctions";
import { expectVecEqualsApprox } from "../helpers";

describe("vecOrigin", () => {
  it("returns (0,0)", () => {
    expectVecEqualsApprox(vecOrigin(), vecReset(0, 0));
  });
});
