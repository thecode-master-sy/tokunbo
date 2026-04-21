import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "e4e3wdqx",
  dataset: "production",
  apiVersion: "2025-04-20",
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN!,
});
