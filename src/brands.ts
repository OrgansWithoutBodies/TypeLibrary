export type BrandTag<TBrand extends string> = { __brand: TBrand };
export type BrandedType<TType, TBrand extends string> = TType &
  BrandTag<TBrand>;

export type BrandedNumber<TBrand extends string> = BrandedType<number, TBrand>;
export type BrandedString<TBrand extends string> = BrandedType<string, TBrand>;

export type NumberInRangeTagExclusive<
  TMin extends number,
  TMax extends number
> = { __min_exclusive: TMin; __max_exclusive: TMax };

export type NumberInRangeExclusive<
  TMin extends number,
  TMax extends number
> = number & NumberInRangeTagExclusive<TMin, TMax>;

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

export type NonZeroPositiveNumber<TNum extends number> = NumberInRangeExclusive<
  0,
  TNum
>;
export type NonZeroNegativeNumber<TNum extends number> = NumberInRangeExclusive<
  TNum,
  0
>;

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

export type NottableTag<TNot extends boolean> = { __not: TNot };

export type Not<TNot extends boolean> = TNot extends true
  ? NottableTag<false>
  : NottableTag<true>;

// function notTest<TNot extends boolean>(val:number & NottableTag<TNot>):Not<TNot>{return !val}

// TODO move what's still useful, deprecate rest
