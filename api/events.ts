import client from "./db.ts";

export default {
  async getAll() {
    return await client.query(`select * from events order by start`);
  },
  async get2() {
    return await client.query(
      `select * from events where start > NOW() order by start limit 2`,
    );
  },

  async getConcerts(searchParams: URLSearchParams) {
    let query = "select * from events where ";
    const params = [];
    for (const [key, value] of searchParams.entries()) {
      switch (key) {
        case "place":
          if (value !== "all") {
            query = query + `place = ? and`;
            params.push(searchParams.get("place"));
          }
          break;
        case "past":
          return client.query(query + " moment in (?,?,?) order by start", [
            ...params,
            searchParams.getAll("moment")[0] || "",
            searchParams.getAll("moment")[1] || "",
            searchParams.getAll("moment")[2] || "",
          ]);
        default:
          break;
      }
    }

    if (searchParams.size) {
      return await client.query(
        query + " start > ? and  moment in (?,?,?) order by start",
        [
          ...params,
          new Date(),
          searchParams.getAll("moment")[0] || "",
          searchParams.getAll("moment")[1] || "",
          searchParams.getAll("moment")[2] || "",
        ],
      );
    }

    return await client.query(
      "select * from events where start > ? order by start",
      [
        new Date(),
      ],
    );
  },

  async getPlaces() {
    return await client.query(`select distinct place from events`);
  },
};
