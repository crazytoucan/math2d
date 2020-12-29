import { boxAlloc } from "../../boxFunctions/boxAlloc";
import { boxClone } from "../../boxFunctions/boxClone";
import { boxReset } from "../../boxFunctions/boxReset";
import { expectBoxEqualsApprox } from "../helpers";

describe("boxClone", () => {
  it("copies components", () => {
    expectBoxEqualsApprox(boxClone(boxReset(4, 5, 6, 7)), 4, 5, 6, 7);
  });

  it("returns a new box if no `out`", () => {
    const box = boxReset(4, 5, 6, 7);
    const res = boxClone(box);
    expect(res).not.toBe(box);
  });

  it("returns `out` if given", () => {
    const out = boxAlloc();
    const res = boxClone(boxReset(4, 5, 6, 7), out);
    expect(res).toBe(out);
  });
});
