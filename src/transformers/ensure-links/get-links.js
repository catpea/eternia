import cheerio from "cheerio";
import pretty from "pretty";

export default main;

function main(html) {
  let unique = new Set();

  const $ = cheerio.load(html);

  const list = $("a")
    .map(function (i, el) {

      const title = ($(this).attr("title") || $(this).text() || "").trim().replace(/\s+/g, " ");
      const url = ($(this).attr("href") || "").trim();
      const id = title + url;

      if (title && url && !unique.has(id)) {
        unique.add(id);
        return { title, url };
      }

    })
    .get()
    .filter((i) => i)
    .map((i) => {
      i.hostname = "local";
      try {
        let hostname = new URL(i.url).hostname;
        i.hostname = hostname;
      } catch (e) {
        // malformed url, assume local
      }
      return i;
    })
    .filter((i) => i);

  return list;
  
}
