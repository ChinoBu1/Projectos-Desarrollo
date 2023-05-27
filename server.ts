import { Application } from "https://deno.land/x/oak@v12.2.0/mod.ts";
import router from "./router.ts";
import routerAdmin from "./routerAdmin.ts";
import {
  CookieStore,
  Session,
} from "https://deno.land/x/oak_sessions@v4.1.4/mod.ts";

type AppState = {
  session: Session;
};
const app = new Application<AppState>();
const store = new CookieStore("Cookie");
app.use(Session.initMiddleware(store));
app.use(routerAdmin.routes());
app.use(routerAdmin.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

export type { AppState };
export default app;
