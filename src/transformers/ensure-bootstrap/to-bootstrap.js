import cheerio from "cheerio";
import pretty from "pretty";

export default main;

function main(html) {
  const $ = cheerio.load(html);

  $("div.section > hr").each(function (i, elem) {
    $(this)
      .parent()
      .replaceWith(`<div class="mb-5 section-spacer">&nbsp;</div>`);
  });

  $("div.section > p").each(function (i, elem) {
    this.tagName = "div";
    $(this).addClass("paragraph");
  });

  $("div.section").each(function (i, elem) {
    $(this).wrap(
      `<div class="card card-section bg-dark text-warning shadow"></div>`
    );
  });

  $("div.section").each(function (i, elem) {
    $(this).addClass("card-body mb-0 my-2");
  });

  $("div.section > div.paragraph").each(function (i, elem) {
    $(this).addClass("card-text card-stanza my-5 text-center");
  });

  /// FIX
  $("div.section img").each(function (i, elem) {
    $(this).addClass("w-100");
  });

  let updated = pretty($("body").html(), { ocd: true });
  updated = updated.replace(/&apos;/gi, "'");
  updated = updated.replace(/&quot;/gi, '"');
  updated = updated.replace(/&amp;/gi, "&");

  return updated;

}
