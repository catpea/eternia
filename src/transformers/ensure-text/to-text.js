import cheerio from "cheerio";
import pretty from "pretty";
import { convert } from "html-to-text";

export default main;

function main(html) {
  let unique = new Set();
  // This is the normalized text version.
  html = pretty(html,{ocd:true});
  //html = html.replace(/<br>[^\n]/gi,'<br>\n')
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

  const text = convert($.html().trim(), {
    wordwrap: 1024
  })
  .replace(/-{3,}/g, '---')
  .replace(/\n{2,}/g, "\n\n");

  if (links.length) text = text + "\n\n\n" + links.map(({ name, url }) => `[${name}]: ${url}`).join("\n");

  return text;
}
