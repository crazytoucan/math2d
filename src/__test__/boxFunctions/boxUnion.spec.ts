import { boxReset, boxUnion } from "../../functions/boxFunctions";
import { expectBoxEqualsApprox } from "../helpers";

describe("boxUnion", () => {
  it("[-1 -1 +1 +1] ∪ [-1 -1 +1 +1] => [-1 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxUnion(boxReset(-1, -1, 1, 1), boxReset(-1, -1, 1, 1)), -1, -1, 1, 1);
  });

  it("[-1 -1 +1 +1] ∪ [-1 -1 +1 +2] => [-1 -1 +1 +2]", () => {
    expectBoxEqualsApprox(boxUnion(boxReset(-1, -1, 1, 1), boxReset(-1, -1, 1, 2)), -1, -1, 1, 2);
  });

  it("[-1 -1 +1 +1] ∪ [0 0 0 0] => [-1 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxUnion(boxReset(-1, -1, 1, 1), boxReset(0, 0, 0, 0)), -1, -1, 1, 1);
  });

  it("[-1 -1 +1 +1] ∪ [-0.5 -0.5 +0.5 +0.5] => [-1 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxUnion(boxReset(-1, -1, 1, 1), boxReset(-0.5, -0.5, 0.5, 0.5)), -1, -1, 1, 1);
  });

  it("[-1 -1 +1 +1] ∪ [+3 -1 +5 +1] => [-1 -1 +5 +1]", () => {
    expectBoxEqualsApprox(boxUnion(boxReset(-1, -1, 1, 1), boxReset(3, -1, 5, 1)), -1, -1, 5, 1);
  });

  it("[-∞ -∞ +∞ +∞] ∪ [-0.5 -0.5 +0.5 +0.5] => [-∞ -∞ +∞ +∞]", () => {
    expectBoxEqualsApprox(
      boxUnion(boxReset(-Infinity, -Infinity, Infinity, Infinity), boxReset(-0.5, -0.5, 0.5, 0.5)),
      -Infinity,
      -Infinity,
      Infinity,
      Infinity,
    );
  });

  it("[+∞ +∞ -∞ -∞] ∪ [-0.5 -0.5 +0.5 +0.5] => [-0.5 -0.5 +0.5 +0.5]", () => {
    expectBoxEqualsApprox(
      boxUnion(boxReset(Infinity, Infinity, -Infinity, -Infinity), boxReset(-0.5, -0.5, 0.5, 0.5)),
      -0.5,
      -0.5,
      0.5,
      0.5,
    );
  });
});
