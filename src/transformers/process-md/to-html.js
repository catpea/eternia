import cheerio from "cheerio";
import pretty from "pretty";

export default main;

function main(html) {
  const $ = cheerio.load(html);

  $('p').not('p+p').each(function(){
    $(this).nextUntil(':not(p)').addBack().wrapAll('<div class="section" />');
  });

  $("hr").replaceWith(`<div class="section"><hr></div>`);

  let updated = pretty($("body").html(), { ocd: true });
  updated = updated.replace(/&apos;/gi, "'");
  updated = updated.replace(/&quot;/gi, '"');
  updated = updated.replace(/&amp;/gi, "&");

  return updated;

}
