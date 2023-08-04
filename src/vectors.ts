import { ArrV } from "type-algebra";
export type ObjV1<TNum extends number = number> = { x: TNum };
export type ObjV2<TNum extends number = number> = { x: TNum; y: TNum };
export type ObjV3<TNum extends number = number> = { x: TNum; y: TNum; z: TNum };
export type ObjV4<TNum extends number = number> = {
  x: TNum;
  y: TNum;
  z: TNum;
  w: TNum;
};

export type DimensionalObjV<TNum extends number> =
  | ObjV1<TNum>
  | ObjV2<TNum>
  | ObjV3<TNum>
  | ObjV4<TNum>;

export type ArrV1<TNum extends number = number> = ArrV<1, TNum>;
export type ArrV2<TNum extends number = number> = ArrV<2, TNum>;
export type ArrV3<TNum extends number = number> = ArrV<3, TNum>;
export type ArrV4<TNum extends number = number> = ArrV<4, TNum>;

export type ArrV2Inclusive<TNum extends number> = ArrV1<TNum> | ArrV2<TNum>;
export type ArrV3Inclusive<TNum extends number> =
  | ArrV2Inclusive<TNum>
  | ArrV3<TNum>;
export type ArrV4Inclusive<TNum extends number> =
  | ArrV3Inclusive<TNum>
  | ArrV4<TNum>;

export type DimensionalArrV<TNum extends number> =
  | ArrV1<TNum>
  | ArrV2<TNum>
  | ArrV3<TNum>
  | ArrV4<TNum>;

export type DimensionalArrVInclusive<TNum extends number> =
  | ArrV1<TNum>
  | ArrV2Inclusive<TNum>
  | ArrV3Inclusive<TNum>
  | ArrV4Inclusive<TNum>;
