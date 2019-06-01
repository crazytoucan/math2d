import { vecAlloc, vecClone, vecReset } from "../../functions/vecFunctions";
import { expectVecEqualsApprox } from "../helpers";

describe("vecClone", () => {
  it("should copy components", () => {
    expectVecEqualsApprox(vecClone(vecReset(4, 5)), vecReset(4, 5));
  });

  it("should return a new vector if no `out`", () => {
    let vec = vecReset(4, 5);
    let res = vecClone(vec);
    expect(res).not.toBe(vec);
  });

  it("should return `out` if given", () => {
    let out = vecAlloc();
    let res = vecClone(vecReset(4, 5), out);
    expect(res).toBe(out);
  });
});
