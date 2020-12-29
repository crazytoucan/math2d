import { vecManhattanDistance } from "../../vecFunctions/vecManhattanDistance";
import { _vec } from "../helpers";

describe("vecManhattanDistance", () => {
  it.each`
    v0         | v1         | result
    ${[4, 6]}  | ${[4, 6]}  | ${0}
    ${[0, -4]} | ${[0, 6]}  | ${10}
    ${[-4, 6]} | ${[6, 20]} | ${24}
  `("$v0 $v1 => $result", ({ v0, v1, result }) => {
    expect(vecManhattanDistance(_vec(v0), _vec(v1))).toBe(result);
  });
});
