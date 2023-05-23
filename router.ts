import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";

import news from "./api/news.ts";
import events from "./api/events.ts";
import newsletter from "./api/newsletter.ts";

const router = new Router();
router
  .get("/", async (ctx, next) => {
    const page = await Deno.readFile(`${Deno.cwd()}/public/index.html`);
    ctx.response.body = page;
    ctx.response.headers.set("Content-Type", "text/html");
    return next();
  })
  .get("/contact", async (ctx, next) => {
    const page = await Deno.readFile(`${Deno.cwd()}/public/contact.html`);
    ctx.response.body = page;
    ctx.response.headers.set("Content-Type", "text/html");
    return next();
  })
  .get("/news", async (ctx, next) => {
    const page = await Deno.readFile(`${Deno.cwd()}/public/news.html`);
    ctx.response.body = page;
    ctx.response.headers.set("Content-Type", "text/html");
    return next();
  })
  .get("/event", async (ctx, next) => {
    const page = await Deno.readFile(`${Deno.cwd()}/public/event.html`);
    ctx.response.body = page;
    ctx.response.headers.set("Content-Type", "text/html");
    return next();
  })
  .get("/music", async (ctx, next) => {
    const page = await Deno.readFile(`${Deno.cwd()}/public/music.html`);
    ctx.response.body = page;
    ctx.response.headers.set("Content-Type", "text/html");
    return next();
  })
  .get("/css/:css", async (ctx, next) => {
    const css = await Deno.readFile(
      `${Deno.cwd()}/public/css/${ctx.params.css}`,
    );
    ctx.response.body = css;
    ctx.response.headers.set("Content-Type", "text/css");
    return next();
  })
  .get("/api/:api", async (ctx, next) => {
    switch (ctx.params.api) {
      case "news":
        ctx.response.body = await news.getFiltered(
          ctx.request.url.searchParams,
        );
        break;
      case "event":
        ctx.response.body = await events.getConcerts(
          ctx.request.url.searchParams,
        );
        break;
      case "newsletter":
        ctx.response.body = await newsletter.getbyEmail(
          ctx.request.url.searchParams,
        );
        break;
      default:
        console.log(ctx.params.api);
        break;
    }
    return next();
  })
  .post("/api/:api", async (ctx, next) => {
    switch (ctx.params.api) {
      case "newsletter":
        ctx.response.body = await newsletter.subcribeNewsletter(
          ctx.request.body({ type: "form-data" }).value,
        );
        break;
      case "comment":
        ctx.response.body = await JSON.stringify("Pong");
        break;
      default:
        console.log(ctx.params.api);
        break;
    }
    return next();
  })
  .get("/api/event/:event", async (ctx, next) => {
    switch (ctx.params.event) {
      case "place":
        ctx.response.body = await events.getPlaces();
        break;
      case "index":
        ctx.response.body = await events.get2();
        break;
      default:
        break;
    }
    return next();
  })
  .get("/api/news/:news", async (ctx, next) => {
    switch (ctx.params.news) {
      case "index":
        ctx.response.body = await news.get2();
        break;
      default:
        break;
    }
    return next();
  })
  .get("/img/:img", async (ctx, next) => {
    const img = await Deno.readFile(
      `${Deno.cwd()}/public/img/${ctx.params.img}`,
    );
    ctx.response.body = img;
    ctx.response.headers.set("Content-Type", "image/*");
    return next();
  })
  .get("/script/:script", async (ctx, next) => {
    const script = await Deno.readFile(
      `${Deno.cwd()}/public/script/${ctx.params.script}`,
    );
    ctx.response.body = script;
    ctx.response.headers.set("Content-Type", "application/javascript");
    return next();
  });

export default router;
