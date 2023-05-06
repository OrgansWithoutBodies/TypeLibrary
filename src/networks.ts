import { BrandedNumber } from "./brands";
import { SpaceTransformationTag } from "./spaceTransforms";

export type ColumnID = BrandedNumber<"Column">;
export type NodeID = BrandedNumber<"Node">;

export type NetworkNode = {};
export type NetworkEdge = {} & SpaceTransformationTag<NodeID, NodeID>;
export type AdjacencyMatrix<T> = T[][];
export type NetworkAsLookup = Record<NodeID, NetworkEdge[]>;

type ColumnToNodeMap = SpaceTransformationTag<ColumnID, NodeID> &
  Record<ColumnID, NodeID>;
type NodeToColumnMap = SpaceTransformationTag<NodeID, ColumnID> &
  Record<NodeID, ColumnID>;

export type ConvertColumnToNode = (
  column: ColumnID,
  map: ColumnToNodeMap
) => NodeID;
export type ConvertNodeToColumn = (
  node: NodeID,
  map: NodeToColumnMap
) => NodeID;

export type ConvertNetworkLookupToAdjMat<T> = (
  lookup: NetworkAsLookup
) => AdjacencyMatrix<T>;
export type ConvertAdjMatToNetworkLookup<T> = (
  lookup: AdjacencyMatrix<T>
) => NetworkAsLookup;
