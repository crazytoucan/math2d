import { IRay, IVec } from "../types";

export function _dot(ray: IRay, vec: IVec) {
  return ray.dirX * (vec.x - ray.x0) + ray.dirY * (vec.y - ray.y0);
}
