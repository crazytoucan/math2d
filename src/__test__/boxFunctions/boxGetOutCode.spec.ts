// tslint:disable:no-bitwise
import { boxGetOutCode } from "../../boxFunctions/boxGetOutCode";
import { boxReset } from "../../boxFunctions/boxReset";
import { OUT_MAX_X, OUT_MAX_Y, OUT_MIN_X, OUT_MIN_Y } from "../../const";
import { vecReset } from "../../vecFunctions/vecReset";

describe("boxGetOutCode", () => {
  it("[-1 -1 +1 +1], (0,2) => OUT_MAX_Y", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(0, 2))).toBe(OUT_MAX_Y);
  });

  it("[-1 -1 +1 +1], (0,-2) => OUT_MIN_Y", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(0, -2))).toBe(OUT_MIN_Y);
  });

  it("[-1 -1 +1 +1], (-2,0) => OUT_MIN_X", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(-2, 0))).toBe(OUT_MIN_X);
  });

  it("[-1 -1 +1 +1], (2,0) => OUT_MIN_X", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(2, 0))).toBe(OUT_MAX_X);
  });

  it("[-1 -1 +1 +1], (-3,3) => OUT_MIN_X | OUT_MAX_Y", () => {
    expect(boxGetOutCode(boxReset(-1, -1, 1, 1), vecReset(-3, 3))).toBe(OUT_MIN_X | OUT_MAX_Y);
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
