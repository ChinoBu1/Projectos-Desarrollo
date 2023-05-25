import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import type { AppState } from "./server.ts";
import admins from "./api/admins.ts";
const routerAdmin = new Router<AppState>();

routerAdmin
  .get("/admin", async (ctx, next) => {
    const page = await Deno.readFile(`${Deno.cwd()}/public/admin.html`);
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
  .get("/admin/:admin", async (ctx, next) => {
    switch (ctx.params.admin) {
      case "login":
        ctx.response.body = await admins.getAdmin(ctx.request.url.searchParams);
        break;
      default:
        break;
    }
    return next();
  })
  .post("/admin", async (ctx) => {
    const form = await ctx.request.body({ type: "form" }).value;
    if (form.get("password") === "correct") {
      // Set persistent data in the session
      ctx.state.session.set("email", form.get("email"));
      ctx.state.session.set("failed-login-attempts", null);
      // Set flash data in the session. This will be removed the first time it's accessed with get
      ctx.state.session.flash("message", "Login successful");
    } else {
      const failedLoginAttempts =
        (await ctx.state.session.get("failed-login-attempts") || 0) as number;
      ctx.state.session.set("failed-login-attempts", failedLoginAttempts + 1);
      ctx.state.session.flash("error", "Incorrect username or password");
    }
    ctx.response.redirect("/admin/post");
  })
  .get("/admin/post", async (ctx, next) => {
    const message = await ctx.state.session.get("email") || "";
    if (message !== "") {
      const page = await Deno.readFile(`${Deno.cwd()}/public/admin.html`);
      ctx.response.body = page;
      ctx.response.headers.set("Content-Type", "text/html");
    } else {
      ctx.response.redirect("/admin");
    }
    return next();
  });
export default routerAdmin;
