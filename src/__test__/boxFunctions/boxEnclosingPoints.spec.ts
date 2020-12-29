import { boxAlloc } from "../../boxFunctions/boxAlloc";
import { boxEnclosingPoints } from "../../boxFunctions/boxEnclosingPoints";
import { vecReset } from "../../vecFunctions/vecReset";
import { expectBoxEqualsApprox, expectBoxEqualsApprox2, _box, _vec } from "../helpers";

describe("boxEnclosingPoints", () => {
  it.each`
    points                                      | result
    ${[]}                                       | ${[Infinity, Infinity, -Infinity, -Infinity]}
    ${[[NaN, NaN]]}                             | ${[Infinity, Infinity, -Infinity, -Infinity]}
    ${[[1, 2]]}                                 | ${[1, 2, 1, 2]}
    ${[[1, 2], [-1, -2]]}                       | ${[-1, -2, 1, 2]}
    ${[[1, 2], [-1, -2], [2, -1]]}              | ${[-1, -2, 2, 2]}
    ${[[1, 2], [-1, -2], [2, -1], [-2, 1]]}     | ${[-2, -2, 2, 2]}
    ${[[NaN, NaN], [-1, -2], [2, -1], [-2, 1]]} | ${[-2, -2, 2, 1]}
    ${[[-3, NaN], [-1, -2], [2, -1], [-2, 1]]}  | ${[-3, -2, 2, 1]}
  `("$points => $result", ({ points, result }) => {
    expectBoxEqualsApprox2(boxEnclosingPoints(points.map(_vec)), _box(result));
  });

  it("updates an `out` box if provided", () => {
    const out = boxAlloc();
    boxEnclosingPoints([vecReset(1, 2)], out);
    expectBoxEqualsApprox(out, 1, 2, 1, 2);
  });
});
