import { vecPerp } from "../../vecFunctions/vecPerp";
import { expectVecEqualsApprox, _vecValues } from "../helpers";

describe("vecPerp", () => {
  it.each`
    vec           | result
    ${[4, 5]}     | ${[-5, 4]}
    ${[-2, -3]}   | ${[3, -2]}
    ${[0, 0]}     | ${[0, 0]}
    ${[NaN, NaN]} | ${[NaN, NaN]}
  `("$vec => $result", ({ vec, result }) => {
    expectVecEqualsApprox(vecPerp(_vecValues(vec)), _vecValues(result));
  });
});
