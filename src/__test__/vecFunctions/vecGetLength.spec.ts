import { vecGetLength } from "../../vecFunctions/vecGetLength";
import { _vecValues } from "../helpers";

describe("vecGetLength", () => {
  it.each`
    vec         | result
    ${[0, 0]}   | ${0}
    ${[0, -4]}  | ${4}
    ${[12, 16]} | ${20}
  `("$vec => $result", ({ vec, result }) => {
    expect(vecGetLength(_vecValues(vec))).toBe(result);
  });
});
