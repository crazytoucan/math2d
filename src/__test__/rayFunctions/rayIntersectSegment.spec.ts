import { rayIntersectSegment } from "../../rayFunctions/rayIntersectSegment";
import { expectEqualsApprox, _ray, _segment } from "../helpers";

const SQRT1_2 = Math.SQRT1_2;
const SQRT2 = Math.SQRT2;
describe("rayIntersectSegment", () => {
  it.each`
    ray             | segment          | t0
    ${[0, 0, 1, 0]} | ${[6, -5, 6, 5]} | ${6}
    ${[0, 0, -1, 0]} | ${[-6, -5, -6, 5]} | ${6}
    ${[0.5, 0.5, 0, 1]} | ${[0, 1, 1, 1]} | ${0.5}
    ${[0.5, 0.5, 1, 0]} | ${[1, 0, 1, 1]} | ${0.5}
    ${[0, 0, SQRT1_2, SQRT1_2]} | ${[0, 4, 4, 0]} | ${2 * SQRT2}
    ${[0, 0, -SQRT1_2, SQRT1_2]} | ${[0, 4, -4, 0]} | ${2 * SQRT2}
    ${[0, 0, -SQRT1_2, -SQRT1_2]} | ${[0, -4, -4, 0]} | ${2 * SQRT2}
    ${[0, 0, SQRT1_2, -SQRT1_2]} | ${[0, -4, 4, 0]} | ${2 * SQRT2}
    ${[5, 10, SQRT1_2, SQRT1_2]} | ${[5, 14, 9, 10]} | ${2 * SQRT2}
    ${[5, 10, -SQRT1_2, SQRT1_2]} | ${[5, 14, 1, 10]} | ${2 * SQRT2}
    ${[5, 10, -SQRT1_2, -SQRT1_2]} | ${[5, 6, 1, 10]} | ${2 * SQRT2}
    ${[5, 10, SQRT1_2, -SQRT1_2]} | ${[5, 6, 9, 10]} | ${2 * SQRT2}
    ${[0, 0, 1, 0]} | ${[5, 1, 1, 5]} | ${false}
    ${[0, 0, 0, 1]} | ${[5, 1, 1, 5]} | ${false}
    ${[0, 0, -1, 0]} | ${[5, 1, 1, 5]} | ${false}
    ${[0, 0, 0, -1]} | ${[5, 1, 1, 5]} | ${false}
  `("$ray $segment => $t0", ({ ray, segment, t0 }) => {
    const actual = rayIntersectSegment(_ray(ray), _segment(segment));
    if (t0 === false) {
      expect(actual.exists).toBe(false);
      expect(actual.t0).toBe(NaN);
      expect(actual.t1).toBe(NaN);
      expect(actual.x).toBe(NaN);
      expect(actual.y).toBe(NaN);
    } else {
      const _r = _ray(ray);
      expectEqualsApprox(actual.t0, t0);
      // TODO: test `t1`
      expectEqualsApprox(actual.x, _r.x0 + t0 * _r.dirX);
      expectEqualsApprox(actual.y, _r.y0 + t0 * _r.dirY);
    }
  });
});

