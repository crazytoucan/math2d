import { vecDot } from "../../vecFunctions/vecDot";
import { _vecValues } from "../helpers";

describe("vecDot", () => {
  it.each`
    v0        | v1         | result
    ${[2, 4]} | ${[3, 10]} | ${46}
  `("$v0 $v1 => $result", ({ v0, v1, result }) => {
    expect(vecDot(_vecValues(v0), _vecValues(v1))).toBe(result);
  });
});
