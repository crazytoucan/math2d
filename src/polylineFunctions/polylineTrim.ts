import { IPolyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { polylineAlloc } from "./polylineAlloc";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetPointAt } from "./polylineGetPointAt";

const TMP0 = vecAlloc();

/**
 * Trims a polyline by an absolute distance from its beginning and its end.
 *
 * @param poly
 * @param begin
 * @param end
 * @param out
 */
export function polylineTrim(poly: IPolyline, begin: number, end: number, out = polylineAlloc()) {
  if (begin > end || poly.length === 0) {
    out.length = 0;
    return;
  }

  begin = Math.max(begin, 0);
  end = Math.min(end, polylineGetNumSegments(poly));

  const beginFloor = Math.floor(begin);
  const endCeil = Math.ceil(end);

  out.length = 2 * (endCeil - beginFloor + 1);
  let cursor = 0;
  const beginPoint = polylineGetPointAt(poly, begin, TMP0);
  out[cursor++] = beginPoint.x;
  out[cursor++] = beginPoint.y;

  for (let i = beginFloor + 1; i < end; i++) {
    out[cursor++] = poly[2 * i];
    out[cursor++] = poly[2 * i + 1];
  }

  const endPoint = polylineGetPointAt(poly, end, TMP0);
  out[cursor++] = endPoint.x;
  out[cursor++] = endPoint.y;
  return out;
}
