import pino, { Logger } from "pino";

const logger: Logger = pino({
  transport: {
    targets: [
      {
        level: "info",
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
      {
        level: "trace",
        target: "pino/file",
        options: { destination: "./logs.log", colorize: true },
      },
    ],
  },
});

export { logger };
