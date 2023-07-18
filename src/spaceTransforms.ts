// this tag can be applied to the type of any transformation object
export type SpaceTransformationTag<
  TOrigin extends number,
  TTarget extends number
> = { __origin: TOrigin; __target: TTarget };

export type ComposeTransformation<TFirstTransformation, TSecondTransformation> =
  TFirstTransformation extends SpaceTransformationTag<infer TOrigin, infer TMid>
    ? TSecondTransformation extends SpaceTransformationTag<TMid, infer TTarget>
      ? SpaceTransformationTag<TOrigin, TTarget>
      : never
    : never;

export type SpaceTransformer<TOrigin extends number, TTarget extends number> = (
  origin: TOrigin
) => TTarget;
export type TransformationOrigin<
  TTransform extends SpaceTransformationTag<number, number>
> = TTransform["__origin"];
export type TransformationTarget<
  TTransform extends SpaceTransformationTag<number, number>
> = TTransform["__target"];

export type TransformInverse<
  TTransform extends SpaceTransformationTag<number, number>
> = SpaceTransformationTag<
  TransformationTarget<TTransform>,
  TransformationOrigin<TTransform>
>;
