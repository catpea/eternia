import cheerio from "cheerio";
import pretty from "pretty";

export default main;

function main(html) {

  const $ = cheerio.load(html);

  const list = $("img").map(function (i, el) {
      const title = $(this).attr("title") || $(this).attr("alt");
      const url = $(this).attr("src")
      .replace(/^\/image\//, "").replace(/^(bl|ss|xs|sm|md|lg|xl)-/, ""); // TODO: v1 has some anaomalies this can be removed in v3
      return { title, url };
    }).get();

  return list;

}
