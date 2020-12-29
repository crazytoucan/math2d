import { mat2dAlloc } from "../../mat2dFunctions/mat2dAlloc";
import { mat2dClone } from "../../mat2dFunctions/mat2dClone";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { expectMat2dEqualsApprox } from "../helpers";

describe("mat2dClone", () => {
  it("copies components", () => {
    expectMat2dEqualsApprox(mat2dClone(mat2dReset(3, 4, 5, 6, 7, 8)), mat2dReset(3, 4, 5, 6, 7, 8));
  });

  it("returns a new mat2d if no `out`", () => {
    const mat = mat2dReset(3, 4, 5, 6, 7, 8);
    expect(mat2dClone(mat)).not.toBe(mat);
  });

  it("returns `out` if given", () => {
    const out = mat2dAlloc();
    expect(mat2dClone(mat2dReset(3, 4, 5, 6, 7, 8), out)).toBe(out);
  });
});
