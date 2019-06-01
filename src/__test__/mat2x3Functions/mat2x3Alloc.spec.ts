import { mat2x3Alloc, mat2x3Reset } from "../../functions/mat2x3Functions";
import { expectMat2x3EqualsApprox } from "../helpers";

describe("mat2x3Alloc", () => {
  it("returns [NaN, NaN, NaN, NaN, NaN, NaN]", () => {
    expectMat2x3EqualsApprox(mat2x3Alloc(), mat2x3Reset(NaN, NaN, NaN, NaN, NaN, NaN));
  });
});
