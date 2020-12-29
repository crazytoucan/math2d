import { mat2dAlloc } from "../../mat2dFunctions/mat2dAlloc";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { expectMat2dEqualsApprox } from "../helpers";

describe("mat2dAlloc", () => {
  it("returns all NaNs", () => {
    expectMat2dEqualsApprox(mat2dAlloc(), mat2dReset(NaN, NaN, NaN, NaN, NaN, NaN));
  });
});
