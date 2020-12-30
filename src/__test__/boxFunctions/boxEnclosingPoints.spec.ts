import { boxAlloc } from "../../boxFunctions/boxAlloc";
import { boxEnclosingPoints } from "../../boxFunctions/boxEnclosingPoints";
import { boxReset } from "../../boxFunctions/boxReset";
import { vecReset } from "../../vecFunctions/vecReset";
import { expectBoxEqualsApprox, _boxValues, _vecValues } from "../helpers";

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
    expectBoxEqualsApprox(boxEnclosingPoints(points.map(_vecValues)), _boxValues(result));
  });

  it("updates an `out` box if provided", () => {
    const out = boxAlloc();
    boxEnclosingPoints([vecReset(1, 2)], out);
    expectBoxEqualsApprox(out, boxReset(1, 2, 1, 2));
  });
});
