import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import type { AppState } from "./server.ts";
const routerAdmin = new Router<AppState>();

routerAdmin
  .get("/admin", async (ctx, next) => {
    const message = await ctx.state.session.get("email") || "";
    const error = await ctx.state.session.get("error") || "";
    const failedLoginAttempts = await ctx.state.session.get(
      "failed-login-attempts",
    );
    const email = await ctx.state.session.get("email");
    ctx.response.body = `<!DOCTYPE html>
    <body>
        <p>
            ${message}
        </p>
        <p>
            ${error}
        </p>
        <p>
            ${
      failedLoginAttempts ? `Failed login attempts: ${failedLoginAttempts}` : ""
    }
        </p>

        ${
      email
        ? `<form id="logout" action="/logout" method="post">
            <button name="logout" type="submit">Log out ${email}</button>
        </form>`
        : `<form id="login" action="/admin" method="post">
            <p>
                <input id="email" name="email" type="text" placeholder="you@email.com">
            </p>
            <p>
                <input id="password" name="password" type="password" placeholder="password">
            </p>
            <button name="login" type="submit">Log in</button>
        </form>`
    }
    </body>`;
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
