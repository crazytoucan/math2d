import { polylineClose } from "../polylineFunctions/polylineClose";
import { polylineIsClosed } from "../polylineFunctions/polylineIsClosed";
import { IPolygon } from "../types";

export function _asPolyline(polygon: IPolygon) {
  if (polygon.length === 0) {
    return polygon;
  } else if (polylineIsClosed(polygon)) {
    return polygon;
  } else {
    return polylineClose(polygon);
  }
}
