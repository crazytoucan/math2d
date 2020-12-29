import { vecGetManhattanLength } from "../../vecFunctions/vecGetManhattanLength";
import { _vec } from "../helpers";

describe("vecGetManhattanLength", () => {
  it.each`
    vec         | result
    ${[0, 0]}   | ${0}
    ${[0, -4]}  | ${4}
    ${[12, 16]} | ${28}
  `("$vec => $result", ({ vec, result }) => {
    expect(vecGetManhattanLength(_vec(vec))).toBe(result);
  });
});
