import { BrandedNumber } from "./brands";

type ObjV3<TNum extends number = number> = { x: TNum; y: TNum; z: TNum };
type Dimension = keyof ObjV3;

type SpaceTag<TDim extends Dimension> = { __dimension: TDim };
type SpaceRelationTag<
  TDim extends Dimension,
  TSub extends Dimension
> = SpaceTag<TDim> & { __subDimension: TSub };

type TranslationComponent<TDim extends Dimension> =
  BrandedNumber<"AffineTranslation"> & SpaceTag<TDim>;
type ScaleComponent<TDim extends Dimension> = BrandedNumber<"AffineScale"> &
  SpaceTag<TDim>;
type RotationComponent<
  TDim extends Dimension,
  TSub extends Dimension
> = BrandedNumber<"AffineRotation"> & SpaceRelationTag<TDim, TSub>;
// type ShearComponent = BrandedNumber<"AffineShear">;

export type GenericMatrixAsArray<
  // TNum extends number,
  S extends ScaleComponent<Dimension> | 1 = ScaleComponent<Dimension> | 1,
  R extends RotationComponent<Dimension, Dimension> | 0 =
    | RotationComponent<Dimension, Dimension>
    | 0,
  T extends TranslationComponent<Dimension> | 0 =
    | TranslationComponent<Dimension>
    | 0
> = [[S, R, R, T], [R, S, R, T], [R, R, S, T], [0, 0, 0, 1]];

export type MatrixAsArray = GenericMatrixAsArray<
  ScaleComponent<Dimension>,
  RotationComponent<Dimension, Dimension>,
  TranslationComponent<Dimension>
>;

export type ScaleMatrix = GenericMatrixAsArray<ScaleComponent<Dimension>, 0, 0>;
export type RotationMatrix = GenericMatrixAsArray<
  1,
  RotationComponent<Dimension, Dimension>,
  0
>;
export type TranslationMatrix = GenericMatrixAsArray<
  1,
  0,
  TranslationComponent<Dimension>
>;
export type IdentityMatrix = GenericMatrixAsArray<1, 0, 0>;

export type TranslationArray = [
  TranslationComponent<"x">,
  TranslationComponent<"y">,
  TranslationComponent<"z">
];
export type ScaleArray = [
  ScaleComponent<"x">,
  ScaleComponent<"y">,
  ScaleComponent<"z">
];
