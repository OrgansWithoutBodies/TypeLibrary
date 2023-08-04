import { RangeTag } from "type-algebra";
import { BrandedNumber } from "./brands";
import { HexString } from "./color";
import { SpaceTransformationTag } from "./spaceTransforms";
import { ObjV2 } from "./vectors";

export type ColumnID = BrandedNumber<"Column">;
export type NodeID = BrandedNumber<"Node">;

export type NetworkNode = { id: NodeID };

// type Matrix<T>=T[][]
export type Adjacency = -1 | 0 | 1;

export type AdjacencyMatrix<T = Adjacency> = T[][];
export type Matrix<T> = T[][];

export type TimeSpace = BrandedNumber<"time">;
export type KonvaSpace = BrandedNumber<"konva">;
export type ScreenSpace = BrandedNumber<"screen">;
// TimelineSpace is a number between 0 & 1, representing the % of the timeline something is placed on
export type TimelineSpace = BrandedNumber<"timeline"> & RangeTag<0, 1>;

export type RawNetwork<
  TNode extends NetworkNode = NetworkNode,
  TEdge extends NetworkEdge = NetworkEdge
> = { edges: TEdge[]; nodes: TNode[] };
export interface RenderableNetworkEdge extends NetworkEdge {
  renderedProps: {
    position: GenericArrow<ObjV2<KonvaSpace>>;
  };
}
export interface RenderableNetworkNode extends NetworkNode {
  renderedProps: { position: ObjV2<KonvaSpace>; color: HexString };
}

// similar to SpaceTransformationTag?
export type GenericArrow<TOrigin, TTarget = TOrigin> = {
  origin: TOrigin;
  target: TTarget;
};

export type NetworkEdge = GenericArrow<NodeID>;

export type NetworkRenderingFunction = (
  network: RawNetwork
) => RenderableNetwork;

export type RenderableNetwork = {
  edges: RenderableNetworkEdge[];
  nodes: RenderableNetworkNode[];
};

// TODO tie nodeOrder to AdjMat type? maybe Matrix as the list-of-lists while adjmat is the lol+nodeOrder?
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

// 1 network = N! adjMats, depending on nodeOrder
export type ConvertNetworkLookupToAdjMat<T> = (
  lookup: NetworkAsLookup,
  nodeOrder: ColumnID[]
) => AdjacencyMatrix<T>;
export type ConvertAdjMatToNetworkLookup<T> = (
  adjMat: AdjacencyMatrix<T>
) => NetworkAsLookup;
