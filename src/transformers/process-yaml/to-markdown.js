import handlebars from "handlebars";
import handlebarsHelpers from "handlebars-helpers";
import TurndownService from 'turndown';
const turndownService = new TurndownService();

var helpers = handlebarsHelpers({
  handlebars: handlebars,
});

import marked from "marked";
import pretty from "pretty";

export default main;

function main(content) {
  const htmlTemplate = `
  {{#is this.type 'quote'}}
    <h2>Quote {{#if author}}by {{author}}{{/if}}</h2>
    <blockquote>
    {{{text}}}
    {{#if author}}
      {{#if url}}
      -- {{author}} - {{url}}
      {{/if}}
      {{#unless url}}
      -- {{author}}
      {{/unless}}
    {{/if}}
    </blockquote>
  {{/is}}

  {{#is this.type 'youtube'}}
  <h2>{{title}}</h2>
  <a href="https://www.youtube.com/watch?v={{id}}{{#if skip}}&t={{skip}}{{/if}}" title="{{title}}"><img src="/image/yid-{{id}}.jpg" alt="{{title}}"></a>
  {{/is}}

  {{#is this.type 'text'}}
  <h2>{{title}}</h2>
  {{{text}}}
  {{/is}}

  {{#is this.type 'poem'}}
  <h2>{{title}} by {{author}}</h2>
  {{{text}}}
  {{/is}}


  {{#is this.type 'image'}}
  <h2>{{title}}</h2>
  <img src="/image/{{url}}" alt="{{title}}">
  {{{text}}}
  {{/is}}

  {{#is this.type 'subtitle'}}
  <h2>{{title}}</h2>
  {{/is}}

  {{#is this.type 'link'}}
  <h2>{{title}}</h2>
  <a href="{{url}}">{{title}} &raquo;</a>
  {{/is}}

  {{#is this.type 'business'}}
  <h2>{{title}}</h2>
  <img src="/image/{{url}}" alt="{{title}}">
  {{{text}}}
  {{/is}}

  `;
  let html = "";
  const template = handlebars.compile(htmlTemplate);

  for (let element of content) {
    if (element.text) element.text = marked(element.text);
    html += template(element);
  }

  html = pretty(html, { ocd: true });
  const markdown = turndownService.turndown(html);
  return markdown;
}
