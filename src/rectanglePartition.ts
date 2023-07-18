import { BrandedString, PercNumber } from "./brands";
import { ObjV2 } from "./vectors";
export type Rect<TWidth extends number, THeight extends TWidth = TWidth> = {
  width: TWidth;
  height: THeight;
};

// TODO - generic "Cartesian Product" operator for internally multiplying any given dimensional vector
type PlacedRect = ObjV2<PercNumber> & Rect<PercNumber>;

type FixedSumTag<TSum extends number> = { __addsTo: TSum };
type FixedAreaTag<TSum extends number> = { __areaProduct: TSum };

// TODO be able to limit these number types?
type SummableObject = { size: number };
type AreaableObject = { width: number; height: number };

// TODO 'NestedFixedTag'? ie {fixes:{sum:TSum,height:THeight [...]}}
// can be used to pin things down
// "__brand" becomes the top-level discriminator,
// ie if all the subBrands match - we can add a __brand to mark a qualitatively unique type
type ArrayFixedSum<
  TSum extends number,
  TArray extends SummableObject[]
> = TArray & FixedSumTag<TSum>;

// TODO technically if we have ObjectFixedArea & either width or height, we can calc the other dimension - so really can be specified in terms of smth like "area & aspect ratio"
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

// type TreeNode<TNode> =
export type Tree<TNode> = TNode & { children: null | TNode };
// type TreeNode<TNode> = TNode | (TNode & { children: TileSummary });
// export type Tree<TNode> = TreeNode<TNode>[];

// the root element in our tree has an area of 1 - doesnt consider nested values
// export type TileTree = ArrayFixedSum<1, Tree<Tile>>;
export type TileTree = any;

export type RectFixedArea<TArea extends number> = ObjectFixedArea<
  TArea,
  Rect<number>
>;
export type RectArea1 = RectFixedArea<1>;
export type RectIn1x1Box = Rect<PercNumber>;
