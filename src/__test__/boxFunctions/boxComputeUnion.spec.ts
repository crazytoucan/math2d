import { boxComputeUnion } from "../../boxFunctions/boxComputeUnion";
import { boxReset } from "../../boxFunctions/boxReset";
import { expectBoxEqualsApprox } from "../helpers";

describe("boxComputeUnion", () => {
  it("[-1 -1 +1 +1] ∪ [-1 -1 +1 +1] => [-1 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxComputeUnion(boxReset(-1, -1, 1, 1), boxReset(-1, -1, 1, 1)), -1, -1, 1, 1);
  });

  it("[-1 -1 +1 +1] ∪ [-1 -1 +1 +2] => [-1 -1 +1 +2]", () => {
    expectBoxEqualsApprox(boxComputeUnion(boxReset(-1, -1, 1, 1), boxReset(-1, -1, 1, 2)), -1, -1, 1, 2);
  });

  it("[-1 -1 +1 +1] ∪ [0 0 0 0] => [-1 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxComputeUnion(boxReset(-1, -1, 1, 1), boxReset(0, 0, 0, 0)), -1, -1, 1, 1);
  });

  it("[-1 -1 +1 +1] ∪ [-0.5 -0.5 +0.5 +0.5] => [-1 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxComputeUnion(boxReset(-1, -1, 1, 1), boxReset(-0.5, -0.5, 0.5, 0.5)), -1, -1, 1, 1);
  });

  it("[-1 -1 +1 +1] ∪ [+3 -1 +5 +1] => [-1 -1 +5 +1]", () => {
    expectBoxEqualsApprox(boxComputeUnion(boxReset(-1, -1, 1, 1), boxReset(3, -1, 5, 1)), -1, -1, 5, 1);
  });

  it("[-∞ -∞ +∞ +∞] ∪ [-0.5 -0.5 +0.5 +0.5] => [-∞ -∞ +∞ +∞]", () => {
    expectBoxEqualsApprox(
      boxComputeUnion(boxReset(-Infinity, -Infinity, Infinity, Infinity), boxReset(-0.5, -0.5, 0.5, 0.5)),
      -Infinity,
      -Infinity,
      Infinity,
      Infinity,
    );
  });

  it("[+∞ +∞ -∞ -∞] ∪ [-0.5 -0.5 +0.5 +0.5] => [-0.5 -0.5 +0.5 +0.5]", () => {
    expectBoxEqualsApprox(
      boxComputeUnion(boxReset(Infinity, Infinity, -Infinity, -Infinity), boxReset(-0.5, -0.5, 0.5, 0.5)),
      -0.5,
      -0.5,
      0.5,
      0.5,
    );
  });
});
