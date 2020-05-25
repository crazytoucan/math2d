import { EPSILON_SQ } from "../internal/const";
import { IPolyline, IVec } from "../types";
import { polylineNearestDistanceSqToPoint } from "./polylineNearestDistanceSqToPoint";

export function polylineContainsPoint(polyline: IPolyline, point: IVec) {
  return polylineNearestDistanceSqToPoint(polyline, point).distanceValue < EPSILON_SQ;
}
