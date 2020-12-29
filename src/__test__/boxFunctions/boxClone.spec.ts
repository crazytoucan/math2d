import { boxAlloc } from "../../boxFunctions/boxAlloc";
import { boxClone } from "../../boxFunctions/boxClone";
import { boxReset } from "../../boxFunctions/boxReset";

describe("boxClone", () => {
  it("copies components", () => {
    expect(boxClone(boxReset(4, 5, 6, 7))).toEqual(boxReset(4, 5, 6, 7));
  });

  it("returns a new box if no `out`", () => {
    const box = boxReset(4, 5, 6, 7);
    expect(boxClone(box)).not.toBe(box);
  });

  it("returns `out` if given", () => {
    const out = boxAlloc();
    expect(boxClone(boxReset(4, 5, 6, 7), out)).toBe(out);
  });
});
