import { boxAlloc } from "../../boxFunctions/boxAlloc";
import { boxReset } from "../../boxFunctions/boxReset";

describe("boxReset", () => {
  it("sets components", () => {
    expect(boxReset(4, 5, 6, 7)).toEqual({
      minX: 4,
      minY: 5,
      maxX: 6,
      maxY: 7,
    });
  });

  it("returns `out` if given", () => {
    const out = boxAlloc();
    expect(boxReset(4, 5, 6, 7, out)).toBe(out);
  });
});
