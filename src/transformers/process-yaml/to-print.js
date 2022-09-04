import handlebars from "handlebars";
import handlebarsHelpers from "handlebars-helpers";
var helpers = handlebarsHelpers({
  handlebars: handlebars,
});

import marked from "marked";
import cheerio from "cheerio";
import pretty from "pretty";


function simplify(html) {
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


export default main;

function main(content) {
  const htmlTemplate = `
  {{#is this.type 'quote'}}
    <div class="section">
      <header>
        <h2>Quote {{#if author}}by {{author}}{{/if}}</h2>
      </header>
      <blockquote>
        {{{text}}}
        <footer>
          {{#if url}}
            <cite title="{{author}}"><a href="{{url}}">{{author}}</a></cite>
          {{/if}}
          {{#unless url}}
            <cite title="{{author}}">{{author}}</cite>
          {{/unless}}
        </footer>
      </blockquote>
    </div>
  {{/is}}

  {{#is this.type 'youtube'}}
    <div class="section yt">
    <a href="https://www.youtube.com/watch?v={{id}}{{#if skip}}&t={{skip}}{{/if}}" title="{{title}}">{{title}}</a>
    </div>
  {{/is}}

  {{#is this.type 'text'}}
    <div class="section">
      <header>
        <h2>{{title}}</h2>
      </header>
      {{{text}}}
    </div>
  {{/is}}

  {{#is this.type 'poem'}}
    <div class="section">
      <header>
        <h2>{{title}}</h2>
        <h3>{{author}}</h3>
      </header>
      {{{text}}}
    </div>
  {{/is}}


  {{#is this.type 'image'}}
  <div class="section">
    <header>
      <h2>{{title}}</h2>
    </header>
      <figure>
        <img src="/image/{{url}}" alt="{{title}}">
      </figure>
      {{{text}}}
  </div>
  {{/is}}

  {{#is this.type 'subtitle'}}
    <div class="section">
      <header>
        <h2>{{title}}</h2>
      </header>
    </div>
  {{/is}}

  {{#is this.type 'link'}}
    <div class="section">
      <header>
        <h2>{{title}}</h2>
      </header>
      <p>
        <a href="{{url}}">{{title}} &raquo;</a>
      </p>
    </div>
  {{/is}}

  {{#is this.type 'business'}}
    <div class="section">
      <header>
        <h2>Business Practice: {{title}}</h2>
      </header>
      <figure>
        <img src="/image/{{url}}" alt="{{title}}">
      </figure>
      {{{text}}}
    </div>
  {{/is}}
  `;
  let html = "";
  const template = handlebars.compile(htmlTemplate);

  for (let element of content) {
    if (element.text) element.text = marked(element.text);
    html += template(element);
  }

  html = simplify(html);
  html = pretty(html, { ocd: true });
  return html;
}
