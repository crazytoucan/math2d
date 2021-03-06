import { vecScale } from "../../vecFunctions/vecScale";
import { expectVecEqualsApprox, _vecValues } from "../helpers";

describe("vecScale", () => {
  it.each`
    vec        | scalar | result
    ${[6, 2]}  | ${3}   | ${[18, 6]}
    ${[6, -2]} | ${-3}  | ${[-18, 6]}
    ${[6, -2]} | ${NaN} | ${[NaN, NaN]}
    ${[4, 5]}  | ${0}   | ${[0, 0]}
  `("$vec $scalar => $result", ({ vec, scalar, result }) => {
    expectVecEqualsApprox(vecScale(_vecValues(vec), scalar), _vecValues(result));
  });
});
