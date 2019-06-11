import { mat2dAlloc } from "../../mat2dFunctions/mat2dAlloc";
import { mat2dClone } from "../../mat2dFunctions/mat2dClone";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { expectmat2dEqualsApprox } from "../helpers";

describe("mat2dClone", () => {
  it("should copy components", () => {
    expectmat2dEqualsApprox(mat2dClone(mat2dReset(3, 4, 5, 6, 7, 8)), mat2dReset(3, 4, 5, 6, 7, 8));
  });

  it("should return a new mat2d if no `out`", () => {
    const mat = mat2dReset(3, 4, 5, 6, 7, 8);
    const res = mat2dClone(mat);
    expect(res).not.toBe(mat);
  });

  it("should return `out` if given", () => {
    const out = mat2dAlloc();
    const res = mat2dClone(mat2dReset(3, 4, 5, 6, 7, 8), out);
    expect(res).toBe(out);
  });
});
