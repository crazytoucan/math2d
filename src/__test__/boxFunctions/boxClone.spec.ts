import { boxAlloc, boxClone, boxReset } from "../../functions/boxFunctions";
import { expectBoxEqualsApprox } from "../helpers";

describe("boxClone", () => {
  it("should copy components", () => {
    expectBoxEqualsApprox(boxClone(boxReset(4, 5, 6, 7)), 4, 5, 6, 7);
  });

  it("should return a new box if no `out`", () => {
    let box = boxReset(4, 5, 6, 7);
    let res = boxClone(box);
    expect(res).not.toBe(box);
  });

  it("should return `out` if given", () => {
    let out = boxAlloc();
    let res = boxClone(boxReset(4, 5, 6, 7), out);
    expect(res).toBe(out);
  });
});
