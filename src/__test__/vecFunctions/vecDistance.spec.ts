import { vecDistance } from "../../vecFunctions/vecDistance";
import { _vec } from "../helpers";

describe("vecDistance", () => {
  it.each`
    v0          | v1          | result
    ${[2, 4]}   | ${[2, 4]}   | ${0}
    ${[0, 4]}   | ${[0, -5]}  | ${9}
    ${[10, 10]} | ${[16, 18]} | ${10}
  `("$v0 $v1 => $result", ({ v0, v1, result }) => {
    expect(vecDistance(_vec(v0), _vec(v1))).toBe(result);
  });
});
