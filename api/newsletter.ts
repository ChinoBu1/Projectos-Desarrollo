import { FormDataReader } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import client from "./db.ts";

export default {
  async getAll() {
    return await client.query(`select * from newsletter`);
  },
  async getbyEmail(searchParams: URLSearchParams) {
    return await client.query(`select * from newsletter where email = ?`, [
      searchParams.get("email"),
    ]);
  },
  async subcribeNewsletter(form: FormDataReader) {
    const email = await form.read();
    return await client.query("insert into newsletter (email) values (?)", [
      email.fields.email,
    ]);
  },
};
