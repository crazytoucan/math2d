import { mat2dAlloc } from "../../mat2dFunctions/mat2dAlloc";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";

describe("mat2dReset", () => {
  it("copies components", () => {
    expect(mat2dReset(3, 4, 5, 6, 7, 8)).toEqual({
      a: 3,
      b: 4,
      c: 5,
      d: 6,
      tx: 7,
      ty: 8,
    });
  });

  it("returns `out` if given", () => {
    const out = mat2dAlloc();
    expect(mat2dReset(3, 4, 5, 6, 7, 8, out)).toBe(out);
  });
});
