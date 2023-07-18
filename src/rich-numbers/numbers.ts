import { ArrV2 } from "../vectors";

export type NumberInRangeTagExclusive<
  TMin extends number,
  TMax extends number
> = { __min_exclusive: TMin; __max_exclusive: TMax };

export type NumberInRangeExclusive<
  TMin extends number,
  TMax extends number
> = number & NumberInRangeTagExclusive<TMin, TMax>;

// TODO when tmin/tmax = number these just become number - ie 0 becomes valid
// min exclusive, max inclusive
export type NumberInRangeExclusiveInclusive<
  TMin extends number,
  TMax extends number
> = NumberInRangeExclusive<TMin, TMax> | TMax;
// min inclusive, max exclusive
export type NumberInRangeInclusiveExclusive<
  TMin extends number,
  TMax extends number
> = NumberInRangeExclusive<TMin, TMax> | TMin;

// we can be sure that if we pass in literals matching the endpoints that we're really in the range - otherwise we can't be sure
type IncludeExclusiveEndpoints<
  TExclusiveRange extends NumberInRangeExclusive<TMin, TMax>,
  TMin extends number,
  TMax extends number
> = TExclusiveRange | TMin | TMax;

export type NumberInRangeInclusive<
  TMin extends number,
  TMax extends number
> = IncludeExclusiveEndpoints<NumberInRangeExclusive<TMin, TMax>, TMin, TMax>;

export type NonZeroPositiveNumber<TNum extends number> =
  | NumberInRangeExclusive<0, TNum>
  // add prototypical nonzero positive number too
  | 1;
export type NonZeroNegativeNumber<TNum extends number> =
  | NumberInRangeExclusive<TNum, 0>
  // add prototypical nonzero negative number too
  | -1;

export type NonZeroNumber =
  | NonZeroNegativeNumber<number>
  | NonZeroPositiveNumber<number>;

// this would be cool -
// export type InvertExclusiveRange<TMin extends number,TMax extends number>
//                                         = ExclusiveRange<TMax*-1,TMin*-1>
// maybe "Negative" space transformation?
export type NonPositiveNumber<TNum extends number> = NumberInRangeInclusive<
  TNum,
  0
>;
export type NonNegativeNumber<TNum extends number> = NumberInRangeInclusive<
  0,
  TNum
>;

export type PercNumber = NumberInRangeInclusive<0, 1>;
export type ExclusivePercNumber = NumberInRangeExclusive<0, 1>;

export type FixedProductTag<TNum extends number> = { __fixedProduct: TNum };
export type FixedSumTag<TNum extends number> = { __fixedSum: TNum };
export type FixedRatioTag<TNum extends number> = { __fixedSum: TNum };

export type IsOrderedTag = { __ordered: true };
// isNonEqual means none of the elements of the list this gets attached to are equal
export type IsNonEqualTag = { __nonEqual: true };

export type OrderedList<TNum extends number> = TNum[] & IsOrderedTag;
export type OrderedListExclusive<TNum extends number> = OrderedList<TNum> &
  IsNonEqualTag;

export type NonEqualPair<TNum extends number> = ArrV2<TNum> & IsNonEqualTag;
export type OrderedPair<TNum extends number> = ArrV2<TNum> & IsOrderedTag;
export type OrderedPairExclusive<TNum extends number> = NonEqualPair<TNum> &
  OrderedPair<TNum>;

export type NaN = number & { __isNaN: true };
export type NaNaN = number & { __isNaN: false };

export type Infinity = number & { __isInfinity: true };
export type Finity = number & { __isInfinity: false };

// TODO might be useful to have some notion of exponentiation factor? allows us to distinguish between both factors of 10 (ie digits) & factors of 2 (ie byte-able objects)
