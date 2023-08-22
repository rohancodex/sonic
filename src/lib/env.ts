import z from "zod";

const envSchema = z.object({
    MODE: z.string(),
    BASE_URL: z.string(),
    PROD: z.boolean(),
    DEV: z.boolean(),
    SSR: z.boolean(),
    VITE_SUPABASE_SECRET: z.string(),
    VITE_SUPABASE_APP_URL: z.string(),
});

export const ENV = envSchema.parse(import.meta.env);
