import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z.string(),
  // RESEND_API_KEY: z.string(),
  UPSTASH_REDIS_REST_URL: z.string(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  PAYSTACK_SECRET_KEY: z.string(),
  PAYSTACK_PUBLIC_KEY: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";

    error.issues.forEach((issue) => {
      message += String(issue.path[0]) + "\n";
    });

    const e = new Error(message);
    e.stack = "";
    throw e;
  } else {
    console.error(error);
  }
}

const env = EnvSchema.parse(process.env);

export default env;
