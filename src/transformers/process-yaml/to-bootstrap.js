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
    <div class="card card-section bg-dark text-warning shadow">
      <div class="card-header">
        Quote {{#if author}}by {{author}}{{/if}}
      </div>
      <div class="card-body">
        <div class="card-text">{{{text}}}</div>
        {{#if url}}
          <cite title="{{author}}"><a href="{{url}}" class="card-link text-reset">{{author}}</a></cite>
        {{/if}}
        {{#unless url}}
          <cite title="{{author}}">{{author}}</cite>
        {{/unless}}
      </div>
    </div>
  {{/is}}

  {{#is this.type 'youtube'}}
    <div class="card card-section bg-dark text-warning shadow">

      <div class="card-header">{{title}}</div>
      <a href="https://www.youtube.com/watch?v={{id}}{{#if skip}}&t={{skip}}{{/if}}" title="{{title}}" alt="{{title}}"><img src="/image/yid-{{id}}.jpg" alt="{{title}}" class="card-img"></a>
      <div class="card-body">
        <a href="https://www.youtube.com/watch?v={{id}}{{#if skip}}&t={{skip}}{{/if}}" title="{{title}}" class="btn btn-warning">Play Video</a>
      </div>
    </div>
  {{/is}}




  {{#is this.type 'text'}}
    <div class="card card-section bg-dark text-warning shadow">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <div class="card-text">{{{text}}}</div>
      </div>
    </div>
  {{/is}}

  {{#is this.type 'poem'}}
    <div class="card card-section bg-dark text-warning shadow">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <h6 class="card-subtitle mb-5 text-muted">{{author}}</h6>
        <div class="card-text">{{{text}}}</div>
      </div>
    </div>
  {{/is}}


  {{#is this.type 'image'}}
    <div class="card card-section bg-dark text-warning shadow">
      <img src="/image/{{url}}" alt="{{title}}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <div class="card-text">{{{text}}}</div>
      </div>
    </div>
  {{/is}}

  {{#is this.type 'subtitle'}}
    <div class="card card-section bg-dark text-warning text-center shadow">
      <div class="card-body">
        <h5 class="card-title display-3">{{title}}</h5>
      </div>
    </div>
  {{/is}}

  {{#is this.type 'link'}}
    <div class="card card-section bg-dark text-warning shadow">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <a href="{{url}}" class="card-link">{{title}}</a>
      </div>
    </div>
  {{/is}}

  {{#is this.type 'business'}}
    <div class="card card-section bg-dark text-warning border-warning shadow">
      <img src="/image/{{url}}" alt="{{title}}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">Business Practice: {{title}}</h5>
        <div class="card-text">{{{text}}}</div>
      </div>
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
