import { IRay, IVec } from "../types";

export function _dotPerp(ray: IRay, point: IVec) {
  return ray.dirX * (point.y - ray.y0) - ray.dirY * (point.x - ray.x0);
}
