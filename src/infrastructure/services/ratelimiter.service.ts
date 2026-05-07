import { makeError } from "@/src/entities/errors";
import { left, right } from "@/src/lib/fp";
import { Redis } from "@upstash/redis";
import env from "@/env";
import { IRateLimiterService } from "@/src/application/services/rateLimiter.service.interface";
import { Duration, Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";

const makeRateLimiterService = (): IRateLimiterService => {
  const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });

  const rateLimitByIp = async (token: number, period: Duration) => {
    const ip = (await headers()).get("x-forwarded-for");

    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(token, period),
    });

    try {
      const { success } = await ratelimit.limit(ip as string);

      if (!success)
        return left(
          makeError(
            "To Many Requests",
            "you have made to many requests please wait a few minutes before you try again",
          ),
        );

      return right("good to go");
    } catch (error) {
      const upstachError = error as {
        cause: {
          message: string;
          code: string;
        };
      };

      if (upstachError.cause.code == "ENOTFOUND") {
        console.log(upstachError.cause.message);
        return left(
          makeError(
            "Network Error",
            "Please check you internet connection and try again",
          ),
        );
      }

      return left(
        makeError(
          "OperationError",
          "Something went wrong, the developers have been notified try again later",
          {
            cause: error,
          },
        ),
      );
    }
  };

  return {
    rateLimitByIp,
  };
};

export default makeRateLimiterService;
