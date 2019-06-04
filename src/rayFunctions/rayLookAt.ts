import { _rayLookAt } from "../internal/internalFunctions";
import { IVec } from "../types";
import { rayAlloc } from "./rayAlloc";

export function rayLookAt(from: IVec, to: IVec, out = rayAlloc()) {
  return _rayLookAt(from.x, from.y, to.x, to.y, out);
}

