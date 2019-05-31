import { vecAlloc, vecReset } from "../../functions/vecFunctions";

describe("vecReset", () => {
  it("should copy components", () => {
    let res = vecReset(4, 5);
    expect(res.x).toBe(4);
    expect(res.y).toBe(5);
  });

  it("should return `out` if given", () => {
    let out = vecAlloc();
    let res = vecReset(4, 5, out);
    expect(res).toBe(out);
  });
});
