import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CORS_ORIGINS: z.string().default("http://localhost:8081,http://localhost:19006")
});
const env = envSchema.parse(process.env);
const allowedOrigins = new Set(env.CORS_ORIGINS.split(",").map((value) => value.trim()).filter(Boolean));

const app = Fastify({
  logger: true,
  trustProxy: env.NODE_ENV === "production",
  bodyLimit: 1024 * 1024
});

await app.register(helmet);
await app.register(cors, {
  credentials: false,
  origin(origin, callback) {
    // Native clients do not send an Origin header. Browser origins are allow-listed.
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS"), false);
  }
});
await app.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute"
});

app.get("/health", async () => ({
  ok: true,
  service: "nexgram-api",
  environment: env.NODE_ENV,
  timestamp: new Date().toISOString()
}));

app.get("/v1/status", async () => ({
  name: "NexGram API",
  version: "0.1.0",
  stage: "foundation",
  capabilities: {
    health: true,
    authentication: false,
    persistentMessaging: false,
    realtime: false,
    mediaStorage: false
  }
}));

// Deliberately do not issue fake verification codes. Connect a legitimate
// SMS/verification provider and persistent rate-limit storage before enabling this.
app.post("/v1/auth/phone/request-code", async (_request, reply) => {
  return reply.code(503).send({
    error: "PHONE_VERIFICATION_NOT_CONFIGURED",
    message: "Phone verification is not available until a verification provider is configured."
  });
});

app.setNotFoundHandler(async (_request, reply) => {
  return reply.code(404).send({ error: "NOT_FOUND" });
});

app.setErrorHandler((error, _request, reply) => {
  app.log.error(error);
  const status = error.statusCode && error.statusCode >= 400 ? error.statusCode : 500;
  return reply.code(status).send({
    error: status === 500 ? "INTERNAL_SERVER_ERROR" : "REQUEST_ERROR",
    message: status === 500 ? "An unexpected server error occurred." : error.message
  });
});

try {
  await app.listen({ host: env.HOST, port: env.PORT });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}

const shutdown = async (signal: string) => {
  app.log.info(`Received ${signal}; shutting down.`);
  await app.close();
  process.exit(0);
};
process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
