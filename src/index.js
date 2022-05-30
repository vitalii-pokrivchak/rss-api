const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swagger = require("swagger-ui-express");
const nodeCron = require("node-cron");
const helmet = require("helmet");
const docs = require("./swagger/swagger.json");
const RSSParser = require("./utils/rss-parser");
const Post = require("./posts/v1/model");
const {router} = require("./posts/v1/");
const {logger, loggerMiddleware} = require("./utils/logger");
const {errorMiddleware, notFoundMiddleware} = require("./utils/middlewares");
const {
    PORT,
    MONGO_URL,
    PARSER_INTERVAL,
    RSS_RESOURCE_URL,
} = require("./config");

// Initialize application
const app = express();

// Register middlewares for application
app.use(helmet());
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use("/v1/posts", router);
app.use(
    "/docs",
    swagger.serve,
    swagger.setup(docs, {
        customSiteTitle: "RSS API Docs",
    })
);
app.use(errorMiddleware);
app.use(notFoundMiddleware);

// Run application
(async function () {
    try {
        await mongoose.connect(MONGO_URL);
        app.listen(PORT, () => {
            logger.info(`Server has been started on ${PORT} port...`, {service: "api"});
        });

        nodeCron.schedule(PARSER_INTERVAL, async () => {
            const posts = await new RSSParser(RSS_RESOURCE_URL).parse();
            await Post.create(posts, function (err) {
                if (err && err.code === 11000) {
                    logger.info("Database is up to date", {service: "rss-parser"});
                    return;
                }

                logger.info("Saving Posts from RSS Channel to Database", {service: "rss-parser"});
            });
        });
    } catch (e) {
        logger.error(e.message);
        process.exit(1);
    }
})();
