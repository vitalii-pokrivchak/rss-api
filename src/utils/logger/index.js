const morgan = require("morgan");
const {createLogger, transports, format} = require("winston");
require("winston-daily-rotate-file");
const {NODE_ENV, LOG_DIR, LOG_FILENAME_DATE_PATTERN} = require("../../config");
const {combine, splat, simple, printf, timestamp, json} = format;

const isDevelopment = NODE_ENV !== "production";

const getLogTransport = () => {
    return isDevelopment
        ? new transports.Console({
            format: combine(
                splat(),
                simple(),
                printf(({level, message}) => `[${level.toUpperCase()}]: ${message}`)
            ),
        })
        : [
            new transports.DailyRotateFile({
                filename: "%DATE%.log",
                dirname: LOG_DIR,
                datePattern: LOG_FILENAME_DATE_PATTERN,
                zippedArchive: true,
                format: combine(timestamp(), json()),
            }),
            new transports.Console({
                format: json(),
            }),
        ];
};

const logger = createLogger({
    level: isDevelopment ? "debug" : "info",
    defaultMeta: {service: "api"},
    transports: getLogTransport(),
    exitOnError: false,
});

const skip = (_, res) => (isDevelopment ? res.statusCode < 400 : false);

const loggerMiddleware = morgan(
    function (tokens, req, res) {
        let msg = {
            statusCode: tokens.status(req, res),
            method: tokens.method(req, res),
            url: tokens.url(req, res),
        };

        if (res.error) {
            msg.error = res.error;
        }

        if (isDevelopment) msg = Object.values(msg).join(" ");

        switch (res.statusCode) {
            case 404:
            case 400:
                logger.warn(msg);
                break;
            case 500:
                logger.error(msg);
                break;
            default:
                logger.info(msg);
                break;
        }
    },
    {skip}
);

module.exports = {
    logger,
    loggerMiddleware,
};
