import { boxContainsPoint } from "../../boxFunctions/boxContainsPoint";
import { IntervalMode } from "../../const";
import { _boxValues, _vecValues } from "../helpers";

describe("boxContainsPoint", () => {
  it.each`
    box                                           | point         | imode                  | result
    ${[-1, -1, 1, 1]}                             | ${[0, 0]}     | ${IntervalMode.CLOSED} | ${true}
    ${[-1, -1, 1, 1]}                             | ${[1, 0]}     | ${IntervalMode.CLOSED} | ${true}
    ${[-1, -1, 1, 1]}                             | ${[0, -2]}    | ${IntervalMode.CLOSED} | ${false}
    ${[-1, -1, 1, 1]}                             | ${[-2, -3]}   | ${IntervalMode.CLOSED} | ${false}
    ${[-1, -1, 1, 1]}                             | ${[NaN, NaN]} | ${IntervalMode.CLOSED} | ${false}
    ${[-Infinity, -Infinity, Infinity, Infinity]} | ${[1, 1]}     | ${IntervalMode.CLOSED} | ${true}
    ${[Infinity, Infinity, -Infinity, -Infinity]} | ${[1, 1]}     | ${IntervalMode.CLOSED} | ${false}
  `("$box $point $imode => $result", ({ box, point, imode, result }) => {
    expect(boxContainsPoint(_boxValues(box), _vecValues(point), imode)).toBe(result);
  });
});
