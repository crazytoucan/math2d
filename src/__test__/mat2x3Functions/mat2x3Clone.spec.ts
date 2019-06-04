import { mat2x3Alloc } from "../../mat2x3Functions/mat2x3Alloc";
import { mat2x3Clone } from "../../mat2x3Functions/mat2x3Clone";
import { mat2x3Reset } from "../../mat2x3Functions/mat2x3Reset";
import { expectMat2x3EqualsApprox } from "../helpers";

describe("mat2x3Clone", () => {
  it("should copy components", () => {
    expectMat2x3EqualsApprox(mat2x3Clone(mat2x3Reset(3, 4, 5, 6, 7, 8)), mat2x3Reset(3, 4, 5, 6, 7, 8));
  });

  it("should return a new mat2x3 if no `out`", () => {
    const mat = mat2x3Reset(3, 4, 5, 6, 7, 8);
    const res = mat2x3Clone(mat);
    expect(res).not.toBe(mat);
  });

  it("should return `out` if given", () => {
    const out = mat2x3Alloc();
    const res = mat2x3Clone(mat2x3Reset(3, 4, 5, 6, 7, 8), out);
    expect(res).toBe(out);
  });
});
