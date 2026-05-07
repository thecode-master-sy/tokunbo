import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicationError } from "@/src/entities/errors";
import { Either, matchEither, matchOption, Option } from "@/src/lib/fp";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makePresenter = () => {
  const formatEither = <B>(
    input: Either<ApplicationError, B>,
    message?: string,
  ) =>
    matchEither(
      (a: ApplicationError) => ({
        error: true,
        errorType: a.type,
        message: a.message,
        data: null,
      }),
      (b: B) => ({
        error: false,
        errorType: null,
        message: message ? message : "Operation successfull",
        data: b,
      }),
    )(input);

  const formatOption = <A>(input: Option<A>) =>
    matchOption(
      () => null,
      (a: A) => a,
    )(input);

  return {
    formatEither,
    formatOption,
  };
};
