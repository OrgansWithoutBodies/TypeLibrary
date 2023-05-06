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
