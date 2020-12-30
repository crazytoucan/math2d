import { EPSILON_SQ } from "../internal/const";
import { Polyline, Vec } from "../types";
import { polylineNearestDistanceSqToPoint } from "./polylineNearestDistanceSqToPoint";

export function polylineContainsPoint(polyline: Polyline, point: Vec) {
  return polylineNearestDistanceSqToPoint(polyline, point).distanceValue < EPSILON_SQ;
}
