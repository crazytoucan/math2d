import { expectVecEqualsApprox } from "../helpers";
import { vecOrigin } from "../../functions/vecFunctions";

describe("vecOrigin", () => {
  it("returns (0,0)", () => {
    expectVecEqualsApprox(vecOrigin(), 0, 0);
  });
});
