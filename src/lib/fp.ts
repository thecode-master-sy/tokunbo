type Compose = <A, B, C>(f: (x: B) => C, g: (x: A) => B) => (x: A) => C;

export const compose: Compose = (f, g) => (x) => f(g(x));

export type Option<A> = Some<A> | None;

export interface Some<A> {
  _tag: "Some";
  value: A;
}

export interface None {
  _tag: "None";
}

export const some = <A>(x: A): Option<A> => ({ _tag: "Some", value: x });

export const none: Option<never> = { _tag: "None" };

const isNone = <A>(x: Option<A>): x is None => x._tag === "None";

type MatchOption = <A, B, C>(
  onNone: () => B,
  onSome: (a: A) => C,
) => (x: Option<A>) => B | C;

export const matchOption: MatchOption = (onNone, onSome) => (x) =>
  isNone(x) ? onNone() : onSome(x.value);

export type Either<A, B> = Left<A> | Right<B>;

export interface Left<A> {
  _tag: "Left";
  left: A;
}

export interface Right<B> {
  _tag: "Right";
  right: B;
}

export const left = <A, B = never>(a: A): Either<A, B> => ({
  _tag: "Left",
  left: a,
});

export const right = <B, A = never>(b: B): Either<A, B> => ({
  _tag: "Right",
  right: b,
});

export const isLeft = <A, B>(x: Either<A, B>): x is Left<A> =>
  x._tag === "Left";

type MatchEither = <A, B, C, D>(
  onLeft: (a: A) => C,
  onRight: (b: B) => D,
) => (x: Either<A, B>) => C | D;

export const matchEither: MatchEither = (onLeft, onRight) => (x) =>
  isLeft(x) ? onLeft(x.left) : onRight(x.right);
