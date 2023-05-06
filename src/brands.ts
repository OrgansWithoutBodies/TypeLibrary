export type BrandTag<TBrand extends string> = { __brand: TBrand };
export type BrandedType<TType, TBrand extends string> = TType &
  BrandTag<TBrand>;

export type BrandedNumber<TBrand extends string> = BrandedType<number, TBrand>;
export type BrandedString<TBrand extends string> = BrandedType<string, TBrand>;

// export type
export type NumberInRangeTagInclusive<
  TMin extends number,
  TMax extends number
> = { __min: TMin; __max: TMax };
export type NumberInRangeTagExclusive<
  TMin extends number,
  TMax extends number
> = { __min: TMin; __max: TMax };

export type NumberInRangeInclusive<
  TMin extends number,
  TMax extends number
> = number & NumberInRangeTagInclusive<TMin, TMax>;
export type NumberInRangeExclusive<
  TMin extends number,
  TMax extends number
> = number & NumberInRangeTagExclusive<TMin, TMax>;

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

export type NonPositiveNumber<TNum extends number> = NumberInRangeInclusive<
  TNum,
  0
>;
export type NonNegativeNumber<TNum extends number> = NumberInRangeInclusive<
  0,
  TNum
>;

export type PercNumber = NumberInRangeInclusive<0, 1>;
