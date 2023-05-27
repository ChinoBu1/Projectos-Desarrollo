import { Router } from "https://deno.land/x/oak@v12.2.0/mod.ts";
import type { AppState } from "./server.ts";
import admins from "./api/admins.ts";
const routerAdmin = new Router<AppState>();

routerAdmin
  .get("/admin", async (ctx, next) => {
    const message = await ctx.state.session.get("admin") || "";
    if (message === "") {
      ctx.response.body = `<!DOCTYPE html>
      <html lang="es">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
              crossorigin="anonymous"></script>
      
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap" rel="stylesheet">
      
          <link rel="stylesheet" href="admin/css/style.css">
          <title>The Band</title>
      </head>
      
      <body>
          <script src="admin/script/admin.js " type="module"></script>
          <div id="admin-login">
              <p>
                  LOGIN DE ADMINISTRADOR
              </p>
      
              <form id="login" action="/admin/login" method="get">
                  <input id="user" name="user" type="text" placeholder="Administrator">
                  <input id="password" name="password" type="password" placeholder="Password">
                  <button name="login" type="submit">Log in</button>
              </form>
          </div>
          <div class="toast-container position-fixed top-50 start-50 translate-middle">
              <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                  <div class="toast-header ">
                      <strong class="me-auto">The Chakleaters</strong>
                      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
                  <div class="toast-body ">
                      Hello, world! This is a toast message.
                  </div>
              </div>
          </div>
      </body>`;
      ctx.response.headers.set("Content-Type", "text/html");
    } else {
      ctx.response.redirect("/admin/post");
    }
    return next();
  })
  .get("/admin/css/:css", async (ctx, next) => {
    const css = await Deno.readFile(
      `${Deno.cwd()}/public/admin/css/${ctx.params.css}`,
    );
    ctx.response.body = css;
    ctx.response.headers.set("Content-Type", "text/css");
    return next();
  })
  .get("/admin/script/:script", async (ctx, next) => {
    const css = await Deno.readFile(
      `${Deno.cwd()}/public/admin/script/${ctx.params.script}`,
    );
    ctx.response.body = css;
    ctx.response.headers.set("Content-Type", "application/javascript");
    return next();
  })
  .get("/admin/post", async (ctx, next) => {
    const message = await ctx.state.session.get("admin") || "";
    if (message !== "") {
      const page = await Deno.readFile(`${Deno.cwd()}/public/index.html`);
      ctx.response.body = page;
      ctx.response.headers.set("Content-Type", "text/html");
    } else {
      ctx.response.redirect("/admin");
    }
    return next();
  })
  .get("/admin/login", async (ctx, next) => {
    const admin = await admins.getAdmin(ctx.request.url.searchParams);
    if (admin.length) {
      ctx.state.session.set("admin", admin[0].user);
    }
    ctx.response.body = admin;
    return next();
  });

export default routerAdmin;
