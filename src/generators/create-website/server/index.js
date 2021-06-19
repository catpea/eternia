#!/usr/bin/env -S node --experimental-modules

import fs from 'fs'
import path from 'path'
import EventEmitter from 'events';

import cheerio from 'cheerio'
import lodash from 'lodash'
import pct from 'calculate-percent'

import Koa from 'koa'

import koaRouter from '@koa/router'
import koaBody from 'koa-body'
import serve from 'koa-static'
import mount from 'koa-mount'
import logger from 'koa-logger'
import views from 'koa-views';

import datasource from './lib/datasource.mjs'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));





class MyEmitter extends EventEmitter {

  async start({port, project}){


      const app = new Koa()

      // console.log('Server project');
      // console.log(project);

      app.use(async (ctx, next) => {

        ctx.state.alert = project.alert;

        ctx.state.title = project.title;
        ctx.state.description = project.description;

        ctx.state.website = project.website;
        ctx.state.tagline = project.tagline;

        ctx.state.network = project.network;
        await next()
      })

      app.use(serve(
        path.join(process.cwd(), 'themes', project.theme, 'static')
      ));

      for( const { mountpoint, directory } of project.mounts ){
        app.use(mount(mountpoint, serve(directory)));
      }

      const router = koaRouter()

      const options = {
        debug: true,
        objects: project.objects,
        limit: 14,
      }

      const data = datasource(options);


      const render = views(path.join(process.cwd(), 'themes', project.theme, 'views'), {
        map: { html: 'ejs' },
      });
      app.use(render)

      app.use(koaBody())

      router
        .get('/', index)
        .get('/book/:name/toc/:order', toc)
        .get('/book/:name/:order/read/:counter', book)
        .get('/book/:name/:order/page/:page', book)
        .get('/book/:name/:order', book)

        .get('/browse/:page', index)
        .get('/read/:name/:counter', read)
        .get('/print/:name/:counter', print)
        .get('/sitemap', sitemap)
        .get('/list', list)

      app.use(router.routes())

      async function index(ctx) {
        const { pages, posts } = data.all.latest
        const pageNumber = ctx.params.page ? parseInt(ctx.params.page) : pages.length - 1
        const selected = lodash.filter(posts, { pageCounter: pageNumber })

        await ctx.render('index', {
          website: ctx.state.website,
          tagline: ctx.state.tagline,
          pageName: ctx.state.website,
          pageDescription: ctx.state.tagline,

          pagination: lodash.last(selected),
          books: data.meta.books,
          posts: selected,
        })

      }

      async function book(ctx) {
        const meta = data.meta.books.filter((o) => o.name === ctx.params.name).pop()
        const order = ctx.params.order ? ctx.params.order : meta.order
        const { pages, posts } = data[ctx.params.name][order]
        const pageNumber = ctx.params.page ? parseInt(ctx.params.page) : order == 'story' ? 0 : pages.length - 1
        const selected = lodash.filter(posts, { pageCounter: pageNumber })
        await ctx.render('book', {
          website: ctx.state.website,
          tagline: ctx.state.tagline,
          bookName: meta.name,
          bookTitle: meta.title,
          pageName: `${meta.title}: ${meta.subtitle}`,
          pageDescription: `${meta.description}`,
          currentSort: order,
          defaultSort: meta.order, // default
          pagination: lodash.last(selected),
          books: data.meta.books,
          posts: selected,
        })
      }

      async function read(ctx) {
        const meta = data.meta.books.filter((o) => o.name === ctx.params.name).pop()
        const order = ctx.params.order ? ctx.params.order : meta.order
        const { pages, posts } = data[ctx.params.name][order]
        const post = lodash.find(posts, function (o) {
          return o.number == parseInt(ctx.params.counter)
        })
        if (!post) ctx.throw(404, 'invalid post id')
        await ctx.render('read', {
          website: ctx.state.website,
          tagline: ctx.state.tagline,
          pageName: post.title,
          pageDescription: `${meta.title}: ${meta.description}`,
          books: data.meta.books,
          post,
        })
      }

      async function print(ctx) {
        const meta = data.meta.books.filter((o) => o.name === ctx.params.name).pop()
        const order = ctx.params.order ? ctx.params.order : meta.order
        const { pages, posts } = data[ctx.params.name][order]
        const post = lodash.find(posts, function (o) {
          return o.number == parseInt(ctx.params.counter)
        })
        if (!post) ctx.throw(404, 'invalid post id')
        await ctx.render('print', {
          website: ctx.state.website,
          tagline: ctx.state.tagline,
          pageName: post.title,
          pageDescription: `${meta.title}: ${meta.description}`,
          books: data.meta.books,
          post,
        })
      }

      async function toc(ctx) {
        const meta = data.meta.books.filter((o) => o.name === ctx.params.name).pop()
        const order = ctx.params.order ? ctx.params.order : meta.order
        const { pages, posts } = data[ctx.params.name][order]
        await ctx.render('toc', {
          website: ctx.state.website,
          tagline: ctx.state.tagline,
          bookName: meta.name,
          bookTitle: meta.title,
          pageName: `${meta.title}: ${meta.subtitle}`,
          pageDescription: `${meta.description}`,
          currentSort: order,
          defaultSort: meta.order, // default
          books: data.meta.books,
          posts,
        })
      }

      async function sitemap(ctx) {
        await ctx.render('sitemap', {
          website: ctx.state.website,
          tagline: ctx.state.tagline,
          books: data.meta.books,
          data,
        })
      }

      async function list(ctx) {
        await ctx.render('list', {
          website: ctx.state.website,
          tagline: ctx.state.tagline,
          books: data.meta.books,
          posts: data.all.posts,
        })
      }


      // class MyEmitter extends EventEmitter {}
      // const myEmitter = new MyEmitter();
      let server = app.listen(port);
      this.emit('start', server);
      // return myEmitter;

      return this; // return emitter
  } // end start()

}

export default MyEmitter;
