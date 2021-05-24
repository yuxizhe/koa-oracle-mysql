const router = require("koa-router")();
const cmsRouter = require("./cmsRouter");

router.use("/api/cms", cmsRouter.middleware());

module.exports = router;
