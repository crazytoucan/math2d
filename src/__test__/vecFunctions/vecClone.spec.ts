import { vecClone, vecAlloc, vecReset } from "../../functions/vecFunctions";
import { IVec } from "../../types";

describe("vecClone", () => {
  it("should copy components", () => {
    let res = vecClone(vecReset(4, 5));
    expect(res.x).toBe(4);
    expect(res.y).toBe(5);
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
