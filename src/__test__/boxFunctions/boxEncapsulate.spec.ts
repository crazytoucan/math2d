import { boxEncapsulate } from "../../boxFunctions/boxEncapsulate";
import { expectBoxEqualsApprox, _boxValues, _vecValues } from "../helpers";

describe("boxEncapsulate", () => {
  it.each`
    box               | point         | result
    ${[-1, -1, 1, 1]} | ${[0, 0]}     | ${[-1, -1, 1, 1]}
    ${[-1, -1, 1, 1]} | ${[1, 0]}     | ${[-1, -1, 1, 1]}
    ${[-1, -1, 1, 1]} | ${[0, -2]}    | ${[-1, -2, 1, 1]}
    ${[-1, -1, 1, 1]} | ${[-2, -3]}   | ${[-2, -3, 1, 1]}
    ${[-1, -1, 1, 1]} | ${[-2, 4]}    | ${[-2, -1, 1, 4]}
    ${[-1, -1, 1, 1]} | ${[NaN, NaN]} | ${[NaN, NaN, NaN, NaN]}
  `("$box $point => $result", ({ box, point, result }) => {
    expectBoxEqualsApprox(boxEncapsulate(_boxValues(box), _vecValues(point)), _boxValues(result));
  });
});
