import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
  MONGODB_URI: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().min(1).optional(),
  ),
})

export const env = envSchema.parse(process.env)
