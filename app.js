const Koa = require("koa");
const koaBody = require("koa-body");
const errorHandle = require("./middlewares/errorHandle");
const router = require("./routers");
const app = new Koa();

app.use(errorHandle);

app.use(
  koaBody({
    multipart: true,
    formLimit: "30mb",
  })
);

app.use(router.routes());

const port = "7878";
app.listen(port);
app.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${port} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

app.on("listening", () => {
  console.log("Listening on port: %d", port);
});
