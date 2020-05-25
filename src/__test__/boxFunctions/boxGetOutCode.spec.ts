// tslint:disable:no-bitwise
import { boxGetOutCode } from "../../boxFunctions/boxGetOutCode";
import { boxReset } from "../../boxFunctions/boxReset";
import { Out } from "../../const";
import { vecReset } from "../../vecFunctions/vecReset";

describe("boxGetOutCode", () => {
  it("[-1 -1 +1 +1], (0,2) => Out.MAX_Y", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(0, 2))).toBe(Out.MAX_Y);
  });

  it("[-1 -1 +1 +1], (0,-2) => Out.MIN_Y", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(0, -2))).toBe(Out.MIN_Y);
  });

  it("[-1 -1 +1 +1], (-2,0) => Out.MIN_X", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(-2, 0))).toBe(Out.MIN_X);
  });

  it("[-1 -1 +1 +1], (2,0) => Out.MIN_X", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(2, 0))).toBe(Out.MAX_X);
  });

  it("[-1 -1 +1 +1], (-3,3) => Out.MIN_X | Out.MAX_Y", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(-3, 3))).toBe(Out.MIN_X | Out.MAX_Y);
  });

  it("[-1 -1 +1 +1], (-1,0) => 0", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(-1, 0))).toBe(0);
  });

  it("[-1 -1 +1 +1], (1,0) => 0", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(1, 0))).toBe(0);
  });

  it("[-1 -1 +1 +1], (0,0) => 0", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(0, 0))).toBe(0);
  });
});
