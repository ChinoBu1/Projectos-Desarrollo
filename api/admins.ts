import { toHashString } from "https://deno.land/std@0.186.0/crypto/to_hash_string.ts";
import client from "./db.ts";

export default {
  async getAll() {
    return await client.query(`select * from admins`);
  },
  async getAdmin(searchParams: URLSearchParams) {
    const pass = searchParams.get("password") || "";
    const hash = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(pass),
    );

    return await client.query(
      `select user from admins where user = ? and password = ?`,
      [
        searchParams.get("user"),
        toHashString(hash, "base64"),
      ],
    );
  },
};
