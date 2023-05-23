import client from "./db.ts";

export default {
  async getAll() {
    return await client.query(`select * from news`);
  },

  async get2() {
    return await client.query(`select * from news order by date desc limit 2`);
  },

  async getFiltered(urlSearch: URLSearchParams) {
    return await client.query(`select * from news where date between ? and ?`, [
      urlSearch.get("start") || "",
      urlSearch.get("end") || new Date(),
    ]);
  },
};
