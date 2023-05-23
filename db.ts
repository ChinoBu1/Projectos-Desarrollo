import {
  Database,
  DataTypes,
  Model,
  MySQLConnector,
} from "https://deno.land/x/denodb@v1.4.0/mod.ts";
import "https://deno.land/std@0.186.0/dotenv/load.ts";

// SQLite3Connector, MySQLConnector, PostgresConnector...
const connector = new MySQLConnector({
  database: "desarrollo",
  host: Deno.env.get("DATABASEADDRES") || "",
  username: Deno.env.get("DENOUSER") || "",
  password: Deno.env.get("DENOPASS") || "",
});

const db = new Database(connector);

class newsletter extends Model {
  static table = "newsletter";
  static fields = {
    email: DataTypes.STRING,
  };
}

class events extends Model {
  static table = "events";
  static fields = {
    name: DataTypes.STRING,
    start: DataTypes.DATETIME,
    end: DataTypes.DATETIME,
    moment: {
      type: DataTypes.ENUM,
      values: ["morning", "afternoon", "night"],
    },
    place: DataTypes.STRING,
  };
}

class news extends Model {
  static table = "news";
  static fields = {
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    text: DataTypes.TEXT,
  };
}

class admins extends Model {
  static table = "admins";
  static fields = {
    user: DataTypes.STRING,
    password: DataTypes.STRING,
  };
}

db.link([newsletter, events, news, admins]);

export { admins, events, news, newsletter };
export default db;
