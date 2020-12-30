import { vecGetLengthSq } from "../../vecFunctions/vecGetLengthSq";
import { _vecValues } from "../helpers";

describe("vecGetLengthSq", () => {
  it.each`
    vec         | result
    ${[0, 0]}   | ${0}
    ${[0, -4]}  | ${16}
    ${[12, 16]} | ${400}
  `("$vec => $result", ({ vec, result }) => {
    expect(vecGetLengthSq(_vecValues(vec))).toBe(result);
  });
});
