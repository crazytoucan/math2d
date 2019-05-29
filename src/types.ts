export interface IVec2 {
  x: number;
  y: number;
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

export type IPolygon = number[];
export type IPolyline = number[];
