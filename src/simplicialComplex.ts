// export type SimplicialComplex={}

import { NodeID } from "./networks";
import { DimensionalArrV, DimensionalArrVInclusive } from "./vectors";

// A simplex has a specific dimension
type Simplex<TNum extends number, TDim extends DimensionalArrV<TNum>> = {
  components: { test: TNum; test1: TDim };
};

/**
 * Immutable
 * a complex can have simplices of any dimensionality below/equal to the complex's dimensionality
 */
export interface SimplicialComplex<
  TNum extends number,
  TDim extends DimensionalArrVInclusive<TNum>
> {
  getStar(node: NodeID): Simplex<TNum, TDim>[];
  glueSimplexToComplexAtPoint(
    simplex: Simplex<TNum, TDim>,
    point: NodeID
  ): SimplicialComplex<TNum, TDim>;
}
