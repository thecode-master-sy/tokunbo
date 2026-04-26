import { ApiResponse } from "../models/api";

export interface BaseErrorType {
  message: string;
  cause?: unknown;
}

export interface ApiErrorCause {
  body?: BodyInit | null;
  init?: ResponseInit;
}

interface NotFoundError extends BaseErrorType {
  type: "NotFoundError";
}

interface UniqueConstraintViolationError extends BaseErrorType {
  type: "UniqueConstraintViolationError";
}

interface InputParseError extends BaseErrorType {
  type: "InputParseError";
}

interface AuthenticationError extends BaseErrorType {
  type: "AuthenticationError";
}

interface UnauthenticatedError extends BaseErrorType {
  type: "UnauthenticatedError";
}

interface UnauthorizedError extends BaseErrorType {
  type: "UnauthorizedError";
}

interface OperationError extends BaseErrorType {
  type: "OperationError";
}

interface InvalidToken extends BaseErrorType {
  type: "InvalidToken";
}

interface TooManyRequests extends BaseErrorType {
  type: "To Many Requests";
}

interface NetworkError extends BaseErrorType {
  type: "Network Error";
}

export type ApplicationError =
  | NotFoundError
  | UniqueConstraintViolationError
  | InputParseError
  | AuthenticationError
  | UnauthenticatedError
  | UnauthorizedError
  | OperationError
  | InvalidToken
  | TooManyRequests
  | NetworkError;

export type ApplicationErrorApiExtended = ApplicationError & ApiResponse;

export const makeError = <T extends ApplicationError["type"]>(
  errorType: T,
  message: string,
  options?: ErrorOptions,
): Extract<ApplicationError, { type: T }> => {
  return {
    type: errorType,
    message: message,
    cause: options?.cause,
  } as Extract<ApplicationError, { type: T }>;
};

const PostgrestErrorCodes = {
  NOT_FOUND: "PGRST116",
  UNIQUE_CONSTRAINT_VIOLATION: "23505",
  NETWORK_ERROR: "ENOTFOUND",
} as const;

type PostgrestError = {
  code: string;
  message: string;
};

export const mapPostgrestErrorToApplicationError = (
  error: PostgrestError,
): ApplicationError => {
  switch (error.code) {
    case PostgrestErrorCodes.NOT_FOUND:
      return makeError("NotFoundError", error.message, { cause: error });
    case PostgrestErrorCodes.UNIQUE_CONSTRAINT_VIOLATION:
      return makeError("UniqueConstraintViolationError", error.message, {
        cause: error,
      });
    case PostgrestErrorCodes.NETWORK_ERROR:
      return makeError("Network Error", error.message, {
        cause: error,
      });
    default:
      return makeError("OperationError", error.message, { cause: error });
  }
};

export const mapErrorToStatusCode = (
  type: ApplicationError["type"],
): number => {
  switch (type) {
    case "To Many Requests":
      return 429;
    case "UnauthenticatedError":
      return 401;
    case "UnauthorizedError":
      return 403;
    case "InputParseError":
      return 400;
    case "NotFoundError":
      return 404;
    default:
      return 500;
  }
};
