import handlebars from "handlebars";
import handlebarsHelpers from "handlebars-helpers";
var helpers = handlebarsHelpers({
  handlebars: handlebars,
});

import marked from "marked";
import pretty from "pretty";

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
      <header>
        <h2>{{title}}</h2>
      </header>
      <figure>
        <a href="https://www.youtube.com/watch?v={{id}}{{#if skip}}&t={{skip}}{{/if}}" class="no-tufte-underline" title="{{title}}">
          <img src="/image/yid-{{id}}.jpg" alt="{{title}}">
        </a>
        <figcaption>{{title}}</figcaption>
      </figure>
      <p><a href="https://www.youtube.com/watch?v={{id}}{{#if skip}}&t={{skip}}{{/if}}" title="{{title}}">Play Video</a></p>
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

  html = pretty(html, { ocd: true });
  return html;
}
