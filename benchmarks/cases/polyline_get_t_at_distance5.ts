import { polylineGetTAtDistance } from "../../src/polylineFunctions/polylineGetTAtDistance";
import { polylineReset } from "../../src/polylineFunctions/polylineReset";

const POLY = polylineReset(0, 0, 1, 1, 2, 0, 3, 1, 4, 0, 5, 1);
const DISTANCE = 5 * Math.sqrt(2) - 0.1;

export function fn() {
  return polylineGetTAtDistance(POLY, DISTANCE);
}
