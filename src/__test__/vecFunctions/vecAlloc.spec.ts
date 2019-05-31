import { vecAlloc } from "../../functions/vecFunctions";

describe("vecAlloc", () => {
  let vec;
  beforeAll(() => {
    vec = vecAlloc();
  });

  it("x NaN", () => {
    expect(vec.x).toBeNaN();
  });

  it("y NaN", () => {
    expect(vec.y).toBeNaN();
  });
});
