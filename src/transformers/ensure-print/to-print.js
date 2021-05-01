import cheerio from "cheerio";
import pretty from "pretty";

export default main;

function main(html) {
  const $ = cheerio.load(html);
  const links = [];

  $("img").each(function (i, elem) {
    $(this).css({ "width": "50%" });
  });
  $("div.section").each(function (i, elem) {
    $(this).addClass("avoid-break-inside");
    $(this).css({ "padding-bottom": "2rem" });
  });

  $("div.section > hr").each(function (i, elem) {
    $(this).replaceWith(`<br>`);
  });

  $("div.section > p").each(function (i, elem) {
    this.tagName = "div";
    $(this).addClass("paragraph");
  });

  $("a").each(function (i, elem) {
    const number = links.length + 1;
    const url = $(this).attr("href");
    links.push({ number, url });
    $(this).replaceWith(`<span>${$(this).text()}<sup>[${number}]</sup></span>`);
  });

  if (links.length > 0) {
    const linkHtml = `
    <div class="break-after">&nbsp;</div>
    <div>
      <div class="section" style="padding-bottom: 1rem;">References</div>
      ${links.map((link) => `<div>[${link.number}]: ${link.url}</div>`).join("\n")}
    </div>
    `;
    $("body").append(linkHtml);
  }

  let updated = pretty($("body").html(), { ocd: true });
  updated = updated.replace(/&apos;/gi, "'");
  updated = updated.replace(/&quot;/gi, '"');
  updated = updated.replace(/&amp;/gi, "&");
  return updated;
}
