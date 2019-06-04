import { _lookAt } from "../internal/_lookAt";
import { IVec } from "../types";
import { lineAlloc } from "./lineAlloc";

export function lineLookAt(from: IVec, to: IVec, out = lineAlloc()) {
  return _lookAt(from.x, from.y, to.x, to.y, out);
}
