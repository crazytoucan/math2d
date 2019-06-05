import { boxAlloc } from "../../boxFunctions/boxAlloc";
import { IBox } from "../../types";

describe("boxAlloc", () => {
  let box: IBox;
  beforeAll(() => {
    box = boxAlloc();
  });

  it("minX NaN", () => {
    expect(box.minX).toBeNaN();
  });

  it("minY NaN", () => {
    expect(box.minY).toBeNaN();
  });

  it("maxX NaN", () => {
    expect(box.maxX).toBeNaN();
  });

  it("maxY NaN", () => {
    expect(box.maxY).toBeNaN();
  });
});
