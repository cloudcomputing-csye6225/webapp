import winston from 'winston';

const { combine, timestamp, printf, splat} = winston.format;

const format = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

export const logger = winston.createLogger({
  format:combine(
    timestamp(),
    splat(),
    format),
  transports: [new winston.transports.File({ filename: 'webapp.log'})],
});
