import { polylineAlloc } from "../../src/polylineFunctions/polylineAlloc";
import { polylineGetTAtDistance } from "../../src/polylineFunctions/polylineGetTAtDistance";

const POLY = polylineAlloc();
for (let i = 0; i < 25; i++) {
  POLY.push(2 * i, 0, 2 * i + 1, 1);
}

const DISTANCE = 50 * Math.sqrt(2) - 0.1;

export function fn() {
  return polylineGetTAtDistance(POLY, DISTANCE);
}
