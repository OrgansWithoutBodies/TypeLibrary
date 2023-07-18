// import { NonNegativeNumber } from "../brands";
// import { ArrV2 } from "../vectors";
// import {
//   ExclusivePercNumber,
//   FixedProductTag,
//   NonEqualPair,
//   NonZeroNegativeNumber,
//   NonZeroNumber,
//   NonZeroPositiveNumber,
//   OrderedList,
//   OrderedListExclusive,
// } from "./numbers";

// // TODO make rich-numbers into its own library
// // TODO 'rich-numbers' to be the type spec, implementation called "mlnar" ('millionare')
// // TODO add lint rules for mlnar

// // TODO seems hard to produce this type
// type InvertedProductPair = [number, number] & FixedProductTag<1>;

// export function isListOrdered(list: number[]): list is OrderedList {
//   return true;
// }

// type SubtractNums<
//   TPair extends ArrV2<TNum>,
//   TNum extends number
//   //    TODO val - 0 = val & 0 - val = -1*val = MultiplyNegative<val>
//   //   TODO inverse ordered list
// > = TPair extends OrderedListExclusive<TNum>
//   ? NonZeroNegativeNumber<number>
//   : TPair extends NonEqualPair<TNum>
//   ? NonZeroNumber
//   : number;
// // type MultiplyPercs<
// //   TFirstPerc extends PercNumber,
// //   TSecondPerc extends PercNumber
// // > = TFirstPerc extends 0
// //   ? // 0 takes priority over 1
// //     0
// //   : TSecondPerc extends 0
// //   ? 0
// //   : TFirstPerc extends 1
// //   ? TSecondPerc
// //   : TSecondPerc extends 1
// //   ? TFirstPerc
// //   : // Neither is 0 or 1, so our number is no longer either of the endpoints
// //     ExclusivePercNumber;

// type MultiplyNums<
//   TPair extends [TNumA, TNumB],
//   TNumA extends number,
//   TNumB extends number
// > = TNumA extends 0
//   ? // 0 takes priority over 1
//     0
//   : TNumB extends 0
//   ? 0
//   : TNumA extends 1
//   ? TNumB
//   : TNumB extends 1
//   ? TNumA
//   : TPair extends InvertedProductPair
//   ? 1
//   : TNumA extends ExclusivePercNumber
//   ? TNumB extends ExclusivePercNumber
//     ? ExclusivePercNumber
//     : // one is an exclusivePerc but the other might not be
//       number
//   : //   TODO negatives
//     number;

// // PercNumA - PercNumB = PercNum | 0 | -1 * PercNum = [-1,1]
// // integer - integer = integer
// export function richSubtract<TPair extends ArrV2<TNum>, TNum extends number>(
//   pair: TPair
// ): SubtractNums<TPair, TNum> {
//   return (pair[0] - pair[1]) as SubtractNums<TPair, TNum>;
// }

// type Integer<TNum> = TNum & { __isInteger: true };
// // export function richExponentiation<>() {}
// // export function richRoot<>() {}
// // modulation useful for space dim to index
// export function richModulation<
//   TNumVal extends number,
//   TNumModulus extends number
// >(
//   val: Integer<NonNegativeNumber<TNumVal>>,
//   modulus: Integer<NonZeroPositiveNumber<TNumModulus>>
// ): Integer<NonNegativeNumber<TNumModulus>> {
//   return (val % modulus) as Integer<NonNegativeNumber<TNumModulus>>;
// }
// // export function richModulation<>() {}
// const testInt1 = 10 as Integer<NonZeroPositiveNumber<number>>;
// const testInt2 = 4 as Integer<NonZeroPositiveNumber<4>>;
// const test = richModulation(testInt1, testInt2);

// // integer * integer = integer
// export function richMultiply<
//   TPair extends [TNumA, TNumB],
//   TNumA extends number,
//   TNumB extends number
// >(pair: TPair): MultiplyNums<TNumA, TNumB> {
//   return (pair[0] * pair[1]) as MultiplyNums<TNumA, TNumB>;
// }
// // 0 + TNum = TNum
// // integer + integer = integer
// // sum [a,b] & {__additiveInverse:true} = 0
// export function richAdd<TPair extends ArrV2<TNum>, TNum extends number>(
//   pair: TPair
// ): MultiplyNums<TPair, TNum> {
//   return (pair[0] * pair[1]) as MultiplyNums<TPair, TNum>;
// }
// // 0 / TNum = 0
// // 1 / TNum = {__multiplicativeInverseOf:TNum}
// // TNum / 1 = TNum
// // {Positive} / -1 = {Negative}
// // TNum / 0 = ?
// //
// export function richDivide<TPair extends ArrV2<TNum>, TNum extends number>(
//   pair: TPair
// ): MultiplyNums<TPair, TNum> {
//   return (pair[0] * pair[1]) as MultiplyNums<TPair, TNum>;
// }

// const test1 = [1, 0] as NonEqualPair<number>;
// const test2 = richSubtract(test1);

// type MultiplyNegative<TNumB extends NonZeroNumber> =
//   TNumB extends NonZeroPositiveNumber<number>
//     ? NonZeroNegativeNumber<number>
//     : NonZeroPositiveNumber<number>;

// // multiplying by -1 is often a unique operation, which might then be composed with other multiplication operations - ie the - sign is rarely incidental
// export function richMultiplyNegative<
//   TNumA extends NonZeroNegativeNumber<TNumA>,
//   TNumB extends NonZeroNumber
// >(negativeNumber: TNumA, otherNumber: TNumB): MultiplyNegative<TNumB>;
