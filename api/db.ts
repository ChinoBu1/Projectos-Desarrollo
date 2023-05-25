import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";
import "https://deno.land/std@0.186.0/dotenv/load.ts";
const client = await new Client().connect({
  hostname: Deno.env.get("DATABASEADDRES") || "localhost",
  username: Deno.env.get("DENOUSER") || "",
  db: "desarrollo",
  password: Deno.env.get("DENOPASS") || "",
  port: 3306,
});

export default client;
