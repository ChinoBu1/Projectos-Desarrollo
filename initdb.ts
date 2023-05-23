import { admins, events, news, newsletter } from "./db.ts";
import { crypto } from "https://deno.land/std@0.186.0/crypto/crypto.ts";
import db from "./db.ts";
import { toHashString } from "https://deno.land/std@0.186.0/crypto/to_hash_string.ts";
import process from "https://deno.land/std@0.177.0/node/process.ts";

await db.sync({ drop: true });

const hash = await crypto.subtle.digest(
  "SHA-256",
  new TextEncoder().encode("pass"),
);

await admins.create({ user: "admin", password: toHashString(hash, "base64") });

await events.create([{
  name: "Concierto 1",
  start: 20231020203000,
  end: 20231021000000,
  moment: "night",
  place: "Mallorca",
}, {
  name: "Concierto 2",
  start: 20221020083000,
  end: 20221020100000,
  moment: "morning",
  place: "Mallorca",
}, {
  name: "Concierto 3",
  start: 20230612150000,
  end: 20230612163000,
  moment: "afternoon",
  place: "Madrid",
}, {
  name: "Concierto 4",
  start: 20230613083000,
  end: 20230613100000,
  moment: "morning",
  place: "Madrid",
}]);

await news.create([{
  title: "Firma de autografos",
  date: 20230501,
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia necessitatibus sapiente placeat reiciendis nostrum? Molestias veniam laudantium, tempore accusantium non labore quis rem, culpa voluptas ipsum nobis et? Ratione, sed." +
    "Ad, minima. Dicta blanditiis ut nulla, quos asperiores sint? Maxime, iure quibusdam perferendis soluta, repellat aut eligendi perspiciatis quam velit consequuntur minus nam optio, excepturi dolorum dolore nobis doloribus neque!" +
    "Hic facilis explicabo vel illo dicta consectetur delectus quis asperiores, quidem pariatur id odit voluptates deserunt quos cupiditate placeat quaerat! Doloremque veritatis odit consequuntur molestias nihil modi ipsum aspernatur ea!" +
    "Temporibus veritatis aspernatur rem quae totam harum nisi possimus dolor quidem cum dolore consequatur, ea placeat suscipit facere iste ipsa quos doloribus veniam. Earum quos incidunt nemo quod perferendis id." +
    "Repellat rep",
}, {
  title: "Entrevista1",
  date: 20230415,
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia necessitatibus sapiente placeat reiciendis nostrum? Molestias veniam laudantium, tempore accusantium non labore quis rem, culpa voluptas ipsum nobis et? Ratione, sed." +
    "Ad, minima. Dicta blanditiis ut nulla, quos asperiores sint? Maxime, iure quibusdam perferendis soluta, repellat aut eligendi perspiciatis quam velit consequuntur minus nam optio, excepturi dolorum dolore nobis doloribus neque!" +
    "Hic facilis explicabo vel illo dicta consectetur delectus quis asperiores, quidem pariatur id odit voluptates deserunt quos cupiditate placeat quaerat! Doloremque veritatis odit consequuntur molestias nihil modi ipsum aspernatur ea!" +
    "Temporibus veritatis aspernatur rem quae totam harum nisi possimus dolor quidem cum dolore consequatur, ea placeat suscipit facere iste ipsa quos doloribus veniam. Earum quos incidunt nemo quod perferendis id." +
    "Repellat repellendus placeat numquam facere soluta dolore harum vitae eos et pariatur nesciunt, tempore facilis nisi voluptates voluptatem ut eveniet veritatis maxime voluptatum sed eligendi ullam explicabo expedita! Possimus, eum.",
}, {
  title: "Entrevista2",
  date: 20230515,
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia necessitatibus sapiente placeat reiciendis nostrum? Molestias veniam laudantium, tempore accusantium non labore quis rem, culpa voluptas ipsum nobis et? Ratione, sed." +
    "Ad, minima. Dicta blanditiis ut nulla, quos asperiores sint? Maxime, iure quibusdam perferendis soluta, repellat aut eligendi perspiciatis quam velit consequuntur minus nam optio, excepturi dolorum dolore nobis doloribus neque!" +
    "Hic facilis explicabo vel illo dicta consectetur delectus quis asperiores, quidem pariatur id odit voluptates deserunt quos cupiditate placeat quaerat! Doloremque veritatis odit consequuntur molestias nihil modi ipsum aspernatur ea!" +
    "Temporibus veritatis aspernatur rem quae totam harum nisi possimus dolor quidem cum dolore consequatur, ea placeat suscipit facere iste ipsa quos doloribus veniam. Earum quos incidunt nemo quod perferendis id." +
    "Repellat repellendus placeat numquam facere soluta dolore harum vitae eos et pariatur nesciunt, tempore facilis nisi voluptates voluptatem ut eveniet veritatis maxime voluptatum sed eligendi ullam explicabo expedita! Possimus, eum.",
}, {
  title: "Entrevista3",
  date: 20230516,
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia necessitatibus sapiente placeat reiciendis nostrum? Molestias veniam laudantium, tempore accusantium non labore quis rem, culpa voluptas ipsum nobis et? Ratione, sed." +
    "Ad, minima. Dicta blanditiis ut nulla, quos asperiores sint? Maxime, iure quibusdam perferendis soluta, repellat aut eligendi perspiciatis quam velit consequuntur minus nam optio, excepturi dolorum dolore nobis doloribus neque!" +
    "Hic facilis explicabo vel illo dicta consectetur delectus quis asperiores, quidem pariatur id odit voluptates deserunt quos cupiditate placeat quaerat! Doloremque veritatis odit consequuntur molestias nihil modi ipsum aspernatur ea!" +
    "Temporibus veritatis aspernatur rem quae totam harum nisi possimus dolor quidem cum dolore consequatur, ea placeat suscipit facere iste ipsa quos doloribus veniam. Earum quos incidunt nemo quod perferendis id." +
    "Repellat repellendus placeat numquam facere soluta dolore harum vitae eos et pariatur nesciunt, tempore facilis nisi voluptates voluptatem ut eveniet veritatis maxime voluptatum sed eligendi ullam explicabo expedita! Possimus, eum.",
}]);

await newsletter.create({ email: "burgosjesus13@gmail.com" });

await db.close();

process.exit();
