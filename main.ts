import app from "./server.ts";
const port = 8080;

app.addEventListener("listen", () => {
  console.log(`Listening on http://localhost:${port}`);
});
app.listen({ port: port });
