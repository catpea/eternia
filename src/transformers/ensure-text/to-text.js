import cheerio from "cheerio";
import pretty from "pretty";

export default main;

function main(html) {
  let unique = new Set();
  // This is the normalized text version.
  const $ = cheerio.load(html);

  // Destroy paragraphs with links, this is considered a stand-alone link line, a button, data not relevant to an excerpt.
  $("p > a").each(function (index, element) {
    if ($(element).parent().contents().length == 1) $(element).remove();
  });

  // Remove images (.text() can interpret them into text via alt/.title, we don't need this.)
  $("img").remove();
  $("figcaption").remove();

  // Add texts so that links can be featured in text.

  let links = [];
  $("p > a").each(function (index, element) {
    const name = $(element).text();
    const url = $(element).attr("href");
    const id = name + url;
    if (name && url && !unique.has(id)) {
      unique.add(id);
      links.push({ name, url });
    }
  });

  let text = $("body")
    .text()
    .trim()
    .split("\n")
    .map((i) => i.trim())
    .join("\n")
    .replace(/\n{2,}/g, "\n\n")
    .trim();

  if (links.length) text = text + "\n\n\n" + links.map(({ name, url }) => `[${name}]: ${url}`).join("\n");

  return text;
}
