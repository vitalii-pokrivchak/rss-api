const axios = require("axios");
const fxp = require("fast-xml-parser");
const { logger } = require("../logger");

class RSSParser {
  constructor(resourceUrl) {
    this.resourceUrl = resourceUrl;
    this.xmlParser = new fxp.XMLParser();
  }

  async parse() {
    try {
      const response = await axios.get(this.resourceUrl);

      if (response.status === 200) {
        logger.info(`Parsing RSS resource from : ${this.resourceUrl}`, [
          { service: "rss-parser" },
        ]);
        const data = this.xmlParser.parse(response.data);
        let items = data?.rss?.channel?.item;

        if (items) {
          items = items.map((item) => {
            return {
              title: item?.title,
              link: item?.link,
              description: item?.description,
              categories: item?.category,
              pubDate: item?.pubDate,
              creator: item["dc:creator"],
            };
          });
        }

        return items;
      }
    } catch (e) {
      logger.error(e.message);
    }
  }
}

module.exports = RSSParser;
