import { mat2dIdentity } from "../../mat2dFunctions/mat2dIdentity";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { expectmat2dEqualsApprox } from "../helpers";

describe("mat2dIdentity", () => {
  it("returns [1 0 0 1 0 0]", () => {
    expectmat2dEqualsApprox(mat2dIdentity(), mat2dReset(1, 0, 0, 1, 0, 0));
  });
});
