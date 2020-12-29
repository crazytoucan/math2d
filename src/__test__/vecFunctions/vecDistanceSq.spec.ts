import { vecDistanceSq } from "../../vecFunctions/vecDistanceSq";
import { _vecValues } from "../helpers";

describe("vecDistanceSq", () => {
  it.each`
    v0          | v1          | result
    ${[2, 4]}   | ${[2, 4]}   | ${0}
    ${[0, 4]}   | ${[0, -5]}  | ${81}
    ${[10, 10]} | ${[16, 18]} | ${100}
  `("$v0 $v1 => $result", ({ v0, v1, result }) => {
    expect(vecDistanceSq(_vecValues(v0), _vecValues(v1))).toBe(result);
  });
});
