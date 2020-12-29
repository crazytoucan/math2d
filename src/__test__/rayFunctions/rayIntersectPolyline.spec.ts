import { rayIntersectPolyline } from "../../rayFunctions/rayIntersectPolyline";
import { expectArrayEqualsApprox, _ray } from "../helpers";

const SQRT1_2 = Math.SQRT1_2;
describe("rayIntersectPolyline", () => {
  it.each`
    ray                             | polyline                          | t0s
    ${[0.5, 0.5, 1, 0]}             | ${[0, 0, 1, 0, 1, 1, 0, 1, 0, 0]} | ${[0.5]}
    ${[0.5, 0.5, -1, 0]}            | ${[0, 0, 1, 0, 1, 1, 0, 1, 0, 0]} | ${[0.5]}
    ${[0.5, 0.5, 0, 1]}             | ${[0, 0, 1, 0, 1, 1, 0, 1, 0, 0]} | ${[0.5]}
    ${[0.5, 0.5, 0, -1]}            | ${[0, 0, 1, 0, 1, 1, 0, 1, 0, 0]} | ${[0.5]}
    ${[0.5, 0.5, SQRT1_2, SQRT1_2]} | ${[0, 0, 1, 0, 1, 1, 0, 1, 0, 0]} | ${[SQRT1_2]}
    ${[0.5, 0.5, 0.6, 0.8]}         | ${[0, 0, 1, 0, 1, 1, 0, 1, 0, 0]} | ${[0.625]}
    ${[0.5, 0.5, -0.8, 0.6]}        | ${[0, 0, 1, 0, 1, 1, 0, 1, 0, 0]} | ${[0.625]}
  `("$ray $polyline => $t0s", ({ ray, polyline, t0s }) => {
    const actual = rayIntersectPolyline(_ray(ray), polyline);
    expectArrayEqualsApprox(
      actual.map((pir) => pir.t0),
      t0s,
    );
  });
});
