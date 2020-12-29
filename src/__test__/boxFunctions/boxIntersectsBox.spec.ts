import { boxIntersectsBox } from "../../boxFunctions/boxIntersectsBox";
import { IntervalMode } from "../../const";
import { _box } from "../helpers";

describe("boxIntersectsBox", () => {
  it.each`
    a                                             | b                         | imode                  | result
    ${[-1, -1, 1, 1]}                             | ${[-1, -1, 1, 1]}         | ${IntervalMode.CLOSED} | ${true}
    ${[-1, -1, 1, 1]}                             | ${[-1, -1, 1, 2]}         | ${IntervalMode.CLOSED} | ${true}
    ${[-1, -1, 1, 1]}                             | ${[0, 0, 0, 0]}           | ${IntervalMode.CLOSED} | ${true}
    ${[-1, -1, 1, 1]}                             | ${[-0.5, -0.5, 0.5, 0.5]} | ${IntervalMode.CLOSED} | ${true}
    ${[-1, -1, 1, 1]}                             | ${[3, -1, 5, 1]}          | ${IntervalMode.CLOSED} | ${false}
    ${[-Infinity, -Infinity, Infinity, Infinity]} | ${[-0.5, -0.5, 0.5, 0.5]} | ${IntervalMode.CLOSED} | ${true}
    ${[Infinity, Infinity, -Infinity, -Infinity]} | ${[-0.5, -0.5, 0.5, 0.5]} | ${IntervalMode.CLOSED} | ${false}
  `("$a $b $imode => $result", ({ a, b, imode, result }) => {
    expect(boxIntersectsBox(_box(a), _box(b), imode)).toBe(result);
  });
});
