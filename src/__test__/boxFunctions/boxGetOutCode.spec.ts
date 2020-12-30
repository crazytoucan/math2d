// tslint:disable:no-bitwise
import { boxGetOutCode } from "../../boxFunctions/boxGetOutCode";
import { Out } from "../../const";
import { _boxValues, _vecValues } from "../helpers";

describe(`boxGetOutCode [MIN_X=${Out.MIN_X}, MAX_X=${Out.MAX_X}, MIN_Y=${Out.MIN_Y}, MAX_Y=${Out.MAX_Y}]`, () => {
  it.each`
    box               | vec        | result
    ${[-1, -1, 1, 1]} | ${[0, 2]}  | ${Out.MAX_Y}
    ${[-1, -1, 1, 1]} | ${[0, -2]} | ${Out.MIN_Y}
    ${[-1, -1, 1, 1]} | ${[-2, 0]} | ${Out.MIN_X}
    ${[-1, -1, 1, 1]} | ${[2, 0]}  | ${Out.MAX_X}
    ${[-1, -1, 1, 1]} | ${[-3, 3]} | ${Out.MIN_X | Out.MAX_Y}
    ${[-1, -1, 1, 1]} | ${[-1, 0]} | ${0}
    ${[-1, -1, 1, 1]} | ${[1, 0]}  | ${0}
    ${[-1, -1, 1, 1]} | ${[0, 0]}  | ${0}
  `("$box $vec => $result", ({ box, vec, result }) => {
    expect(boxGetOutCode(_boxValues(box), _vecValues(vec))).toBe(result);
  });
});
