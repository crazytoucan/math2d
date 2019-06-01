import { expectMat2x3EqualsApprox } from "../helpers";
import { mat2x3AffIdentity } from "../../functions/mat2x3Functions";

describe("mat2x3AffIdentity", () => {
  it("returns [1 0 0 1 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffIdentity(), 1, 0, 0, 1, 0, 0);
  });
});
