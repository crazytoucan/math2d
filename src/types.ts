export interface IVec2 {
  x: number;
  y: number;
}

export interface IVec3 {
  x: number;
  y: number;
  z: number;
}

export interface ISegment2 {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface IRay2 {
  x0: number;
  y0: number;
  dirX: number;
  dirY: number;
}

export interface IMat2 {
  m11: number;
  m12: number;
  m21: number;
  m22: number;
}

export interface IMat3 {
  m11: number;
  m12: number;
  m13: number;
  m21: number;
  m22: number;
  m23: number;
  m31: number;
  m32: number;
  m33: number;
}

export interface IMat2x3 {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export interface IAabb2 {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type IPolygon2 = number[];
export type IPolyline2 = number[];
