export interface IVec2 {
  x: number;
  y: number;
}

export interface IMat2x3 {
  m11: number;
  m12: number;
  m21: number;
  m22: number;
  tx: number;
  ty: number;
}

export interface IAabb2 {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type IVec2Array = number[];
