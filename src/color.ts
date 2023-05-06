import { NumberInRangeInclusive } from "./brands";

export type Channel = "R" | "G" | "B" | "A";

export type ColorChannelTag<TChannel extends Channel> = { __channel: TChannel };
export type HexChannelNumber<TChannel extends Channel> =
  ColorChannelTag<TChannel> & NumberInRangeInclusive<0, 255>;

export type ColorNumberArraySolid = [
  HexChannelNumber<"R">,
  HexChannelNumber<"G">,
  HexChannelNumber<"B">
];
export type ColorNumberArrayTransparent = [
  HexChannelNumber<"R">,
  HexChannelNumber<"G">,
  HexChannelNumber<"B">,
  HexChannelNumber<"A">
];

export type ColorNumberArray =
  | ColorNumberArraySolid
  | ColorNumberArrayTransparent;
