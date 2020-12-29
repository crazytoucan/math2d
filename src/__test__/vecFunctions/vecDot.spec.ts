import { vecDot } from "../../vecFunctions/vecDot";
import { _vec } from "../helpers";

describe("vecDot", () => {
  it.each`
    v0        | v1         | result
    ${[2, 4]} | ${[3, 10]} | ${46}
  `("$v0 $v1 => $result", ({ v0, v1, result }) => {
    expect(vecDot(_vec(v0), _vec(v1))).toBe(result);
  });
});
