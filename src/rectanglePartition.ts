import { BrandedString, PercNumber } from "./brands";
import { ObjV2 } from "./vectors";
export type Rect<TNum extends number> = {
  width: TNum;
  height: TNum;
};

// TODO - generic "Cartesian Product" operator for internally multiplying any given dimensional vector
type PlacedRect = ObjV2<PercNumber> & Rect<PercNumber>;

type FixedSumTag<TSum extends number> = { __addsTo: TSum };
type FixedAreaTag<TSum extends number> = { __areaProduct: TSum };

// TODO be able to limit these number types?
type SummableObject = { size: number };
type AreaableObject = { width: number; height: number };

type ArrayFixedSum<
  TSum extends number,
  TArray extends SummableObject[]
> = TArray & FixedSumTag<TSum>;

export type ObjectFixedArea<
  TArea extends number,
  TObj extends AreaableObject
> = TObj & FixedAreaTag<TArea>;

type ArrayFixedAreaSum<
  TArea extends number,
  TArray extends AreaableObject[]
> = TArray & FixedAreaTag<TArea>;

// function ArrayIsFixedSum<TSum extends number, TArray extends SummableObject[]>(
//   potentialFixedSumArray: TArray,
//   sumToCheckAgainst: TSum
// ): potentialFixedSumArray is ArrayFixedSum<TSum, TArray> {
//   return (
//     potentialFixedSumArray.reduce((prev, { size }) => prev + size, 0) ===
//     sumToCheckAgainst
//   );
// }
// function ArrayIsFixedArea<
//   TArea extends number,
//   TArray extends AreaableObject[]
// >(
//   potentialFixedSumArray: TArray,
//   sumToCheckAgainst: TArea
// ): potentialFixedSumArray is ArrayFixedArea<TArea, TArray> {
//   return (
//     potentialFixedSumArray.reduce(
//       (prev, { width, height }) => prev + width * height,
//       0
//     ) === sumToCheckAgainst
//   );
// }

export type TileID = BrandedString<"tile">;
// type PartitionID = BrandedString<"tile">;
// TODO some way to enforce that array index of tile === array index of partition?
type Tile = { id: TileID; size: PercNumber };

export type Partition<TNum extends number = 1> = ArrayFixedAreaSum<
  TNum,
  PlacedRect[]
>;
export type TileSummary = ArrayFixedSum<1, Tile[]>;
export type RectanglePartition = {
  tiles: TileSummary;
  partition: Partition;
};

type NestedTile = Tile & { children: TileSummary };
type PotentiallyNestedTile = Tile | NestedTile;

export type TileTree = ArrayFixedSum<1, PotentiallyNestedTile[]>;
