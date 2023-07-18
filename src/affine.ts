import { BrandedNumber } from "./brands";
import { ObjV2, ObjV3 } from "./vectors";

export type Dim3D = keyof ObjV3<number>;
export type Dim2D = keyof ObjV2<number>;

// type Dimension = Dim2D|Dim3D

type SpaceTag<TDim extends Dim3D> = { __dimension: TDim };
type SpaceRelationTag<
  TDim extends Dim3D,
  TSub extends Dim3D
> = SpaceTag<TDim> & { __subDimension: TSub };

type TranslationComponent<TDim extends Dim3D> =
  BrandedNumber<"AffineTranslation"> & SpaceTag<TDim>;
type ScaleComponent<TDim extends Dim3D> = BrandedNumber<"AffineScale"> &
  SpaceTag<TDim>;
type RotationComponent<
  TDim extends Dim3D,
  TSub extends Dim3D
> = BrandedNumber<"AffineRotation"> & SpaceRelationTag<TDim, TSub>;

export type TwoDimSpaceMatrixAsArray<
  S extends ScaleComponent<Dim2D> | 1 = ScaleComponent<Dim2D> | 1,
  R extends RotationComponent<Dim2D, Dim2D> | 0 =
    | RotationComponent<Dim2D, Dim2D>
    | 0,
  T extends TranslationComponent<Dim2D> | 0 = TranslationComponent<Dim2D> | 0
> = [[S, R, T], [R, S, T], [0, 0, 1]];

export type GenericMatrixAsArray<
  // TNum extends number,
  S extends ScaleComponent<Dim3D> | 1 = ScaleComponent<Dim3D> | 1,
  R extends RotationComponent<Dim3D, Dim3D> | 0 =
    | RotationComponent<Dim3D, Dim3D>
    | 0,
  T extends TranslationComponent<Dim3D> | 0 = TranslationComponent<Dim3D> | 0
> = [[S, R, R, T], [R, S, R, T], [R, R, S, T], [0, 0, 0, 1]];

export type MatrixAsArray = GenericMatrixAsArray<
  ScaleComponent<Dim3D>,
  RotationComponent<Dim3D, Dim3D>,
  TranslationComponent<Dim3D>
>;

export type ScaleMatrix = GenericMatrixAsArray<ScaleComponent<Dim3D>, 0, 0>;
export type RotationMatrix = GenericMatrixAsArray<
  1,
  RotationComponent<Dim3D, Dim3D>,
  0
>;
export type ShearMatrix = GenericMatrixAsArray<
  ScaleComponent<Dim3D>,
  RotationComponent<Dim3D, Dim3D>,
  0
>;
export type TranslationMatrix = GenericMatrixAsArray<
  1,
  0,
  TranslationComponent<Dim3D>
>;
export type ScaleAndTranslateMatrix = GenericMatrixAsArray<
  ScaleComponent<Dim3D>,
  0,
  TranslationComponent<Dim3D>
>;

export type NonRotationMatrix =
  | ScaleAndTranslateMatrix
  | TranslationMatrix
  | ScaleMatrix;

export type IdentityMatrix = GenericMatrixAsArray<1, 0, 0>;

export type TranslationArray = [
  TranslationComponent<"x">,
  TranslationComponent<"y">,
  TranslationComponent<"z">
];
export type TranslationArray2D = [
  TranslationComponent<"x">,
  TranslationComponent<"y">
];
export type ScaleArray = [
  ScaleComponent<"x">,
  ScaleComponent<"y">,
  ScaleComponent<"z">
];
export type ScaleArray2D = [ScaleComponent<"x">, ScaleComponent<"y">];
