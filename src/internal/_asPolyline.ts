import { polylineClose } from "../polylineFunctions/polylineClose";
import { polylineIsClosed } from "../polylineFunctions/polylineIsClosed";
import { IPolygon } from "../types";
import { _Allocator } from "./_Allocator";

export function _asPolyline(polygon: IPolygon, allocator: _Allocator) {
  if (polygon.length === 0) {
    return polygon;
  } else if (polylineIsClosed(polygon)) {
    return polygon;
  } else {
    const transfer = allocator.allocTempArray(polygon.length + 2);
    polylineClose(polygon, transfer);
    return transfer;
  }
}
