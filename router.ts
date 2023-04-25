import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();
router
  .get("/", async (ctx) => {
    const index = await Deno.readFile(`${Deno.cwd()}/public/index.html`);
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
  .get("/script/:script", async (ctx) => {
    const script = await Deno.readFile(
      `${Deno.cwd()}/public/script/${ctx.params.script}`,
    );
    ctx.response.body = script;
    ctx.response.headers.set("Content-Type", "application/javascript");
  });

export default router;
