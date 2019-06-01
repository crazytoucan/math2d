import { expectVecEqualsApprox } from "../helpers";
import { vecOrigin, vecReset } from "../../functions/vecFunctions";

describe("vecOrigin", () => {
  it("returns (0,0)", () => {
    expectVecEqualsApprox(vecOrigin(), vecReset(0, 0));
  });
});
