import { vecAlloc } from "../../vecFunctions/vecAlloc";
import { vecClone } from "../../vecFunctions/vecClone";
import { vecReset } from "../../vecFunctions/vecReset";
import { expectVecEqualsApprox } from "../helpers";

describe("vecClone", () => {
  it("copies components", () => {
    expectVecEqualsApprox(vecClone(vecReset(4, 5)), vecReset(4, 5));
  });

  it("returns a new vector if no `out`", () => {
    const vec = vecReset(4, 5);
    expect(vecClone(vec)).not.toBe(vec);
  });

  it("returns `out` if given", () => {
    const out = vecAlloc();
    expect(vecClone(vecReset(4, 5), out)).toBe(out);
  });
});
