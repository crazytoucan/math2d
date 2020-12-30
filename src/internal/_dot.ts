import { Ray, Vec } from "../types";

export function _dot(ray: Ray, vec: Vec) {
  return ray.dirX * (vec.x - ray.x0) + ray.dirY * (vec.y - ray.y0);
}
