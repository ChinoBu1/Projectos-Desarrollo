import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const router = new Router();
router
  .get("/", async (ctx) => {
    const index = await Deno.readFile(`${Deno.cwd()}/public/index.html`);
    ctx.response.body = index;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/contact", async (ctx) => {
    const index = await Deno.readFile(`${Deno.cwd()}/public/contact.html`);
    ctx.response.body = index;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/news", async (ctx) => {
    const index = await Deno.readFile(`${Deno.cwd()}/public/news.html`);
    ctx.response.body = index;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/event", async (ctx) => {
    const index = await Deno.readFile(`${Deno.cwd()}/public/event.html`);
    ctx.response.body = index;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/music", async (ctx) => {
    const index = await Deno.readFile(`${Deno.cwd()}/public/music.html`);
    ctx.response.body = index;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/css/:css", async (ctx) => {
    const css = await Deno.readFile(
      `${Deno.cwd()}/public/css/${ctx.params.css}`,
    );
    ctx.response.body = css;
    ctx.response.headers.set("Content-Type", "text/css");
  })
  .get("/img/:img", async (ctx) => {
    const img = await Deno.readFile(
      `${Deno.cwd()}/public/img/${ctx.params.img}`,
    );
    ctx.response.body = img;
    ctx.response.headers.set("Content-Type", "image/*");
  })
  .get("/script/:script", async (ctx) => {
    const script = await Deno.readFile(
      `${Deno.cwd()}/public/script/${ctx.params.script}`,
    );
    ctx.response.body = script;
    ctx.response.headers.set("Content-Type", "application/javascript");
  });

export default router;
