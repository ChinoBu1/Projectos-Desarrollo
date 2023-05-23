import { Application } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import router from "./router.ts";
import routerAdmin from "./routerAdmin.ts";
import { Session } from "https://deno.land/x/oak_sessions@v4.1.4/mod.ts";

type AppState = {
  session: Session;
};
const app = new Application<AppState>();
app.use(Session.initMiddleware());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routerAdmin.routes());
app.use(routerAdmin.allowedMethods());

export type { AppState };
export default app;
