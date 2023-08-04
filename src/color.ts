// import { NumbersFrom0ToN } from "type-algebra";
import { NumberInRangeInclusive } from "./brands";

export type Channel = "R" | "G" | "B" | "A";
// TODO replace dummy type
type NumbersFrom0ToN<T> = T extends number ? number : number;
// TODO number in range 0-X / X = number in range 0-1
export type ColorChannelTag<TChannel extends Channel> = { __channel: TChannel };
export type HexChannelNumber<TChannel extends Channel> =
  ColorChannelTag<TChannel> & NumberInRangeInclusive<0, 255>;

export type HexDigits = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F"
];

type DigitDecimalToHex<Dec extends NumbersFrom0ToN<16>> = HexDigits[Dec];
export type ChannelToHex<
  // TODO how to split 16 out of 256? maybe with array methods can figure out a square root?
  DigitA extends NumbersFrom0ToN<16>,
  DigitB extends NumbersFrom0ToN<16>
> = `${DigitDecimalToHex<DigitA>}${DigitDecimalToHex<DigitB>}`;

// type He
// type test = ChannelToHex<1, 13>;
export type HexDigit = HexDigits[number];

export type HexChannel = `${HexDigit}${HexDigit}`;

// TODO Gray channel strings
export type HexString = `#${string}`;
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
