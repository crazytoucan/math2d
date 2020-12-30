import { vecLerp } from "../../vecFunctions/vecLerp";
import { expectVecEqualsApprox, _vecValues } from "../helpers";

describe("vecLerp", () => {
  it.each`
    v0          | v1          | scalar  | result
    ${[0, 0]}   | ${[1, 0]}   | ${0}    | ${[0, 0]}
    ${[0, 0]}   | ${[1, 0]}   | ${0.5}  | ${[0.5, 0]}
    ${[0, 0]}   | ${[1, 0]}   | ${1}    | ${[1, 0]}
    ${[4, 4]}   | ${[4, 4]}   | ${0}    | ${[4, 4]}
    ${[4, 4]}   | ${[4, 4]}   | ${2}    | ${[4, 4]}
    ${[10, 10]} | ${[20, 30]} | ${0.75} | ${[17.5, 25]}
    ${[0, 0]}   | ${[1, 1]}   | ${NaN}  | ${[NaN, NaN]}
    ${[0, 0]}   | ${[0, 0]}   | ${NaN}  | ${[NaN, NaN]}
  `("$v0 $v1 $scalar => $result", ({ v0, v1, scalar, result }) => {
    expectVecEqualsApprox(vecLerp(_vecValues(v0), _vecValues(v1), scalar), _vecValues(result));
  });
});
