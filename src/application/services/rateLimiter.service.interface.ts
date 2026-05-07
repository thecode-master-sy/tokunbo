import { ApplicationError } from "@/src/entities/errors";
import { Either } from "@/src/lib/fp";
import { Duration } from "@upstash/ratelimit";

export interface IRateLimiterService {
  rateLimitByIp(
    tokens: number,
    period: Duration,
  ): Promise<Either<ApplicationError, string>>;
}
