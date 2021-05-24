const router = require("koa-joi-router");
const service = require("../services/cmsService");
const jsonWriter = require("../utils/jsonwriter");

const Joi = router.Joi;
const resRouter = router();

const VERSIONS_VALIDATE = {
  detail: {
    validate: {
      query: {
        id: Joi.number().required(),
        db: Joi.string().optional(),
      },
    },
  },
  detailByName: {
    validate: {
      query: {
        aid: Joi.number().required(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        sub_type: Joi.string().optional(),
      },
    },
  },
  delete: {
    validate: {
      validate: {
        type: "form",
        body: Joi.object({
          id: Joi.number().required(),
        }),
      },
    },
  },
  list: {
    validate: {
      query: {
        aid: Joi.number().optional(),
        page: Joi.number().optional(),
        size: Joi.number().optional(),
        type: Joi.string().optional().allow(""),
        sub_type: Joi.string().optional().allow(""),
        name_search: Joi.string().optional().allow(""),
        title_search: Joi.string().optional().allow(""),
        content_search: Joi.string().optional().allow(""),
      },
    },
  },
  getSubTypes: {
    validate: {
      query: {
        type: Joi.string().required(),
      },
    },
  },
  create: {
    validate: {
      type: "form",
      body: Joi.object({
        name: Joi.string().max(256).required(),
        url: Joi.string().max(256).required(),
        type: Joi.string().max(128).required(),
        sub_type: Joi.string().max(128).optional().allow(""),
        title: Joi.string().max(128).optional().allow(""),
        comment: Joi.string().max(256).required(),
        content: Joi.string().required(),
      }).options({
        allowUnknown: true,
      }),
    },
  },
  update: {
    validate: {
      type: "form",
      body: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().max(256).required(),
        url: Joi.string().max(256).optional().allow(""),
        type: Joi.string().max(128).required(),
        sub_type: Joi.string().max(128).optional().allow(""),
        title: Joi.string().max(128).optional().allow(""),
        comment: Joi.string().max(256).required(),
        content: Joi.string().required(),
      }).options({
        allowUnknown: true,
      }),
    },
  },
};

// 基本信息
resRouter.get("/detail", VERSIONS_VALIDATE.detail, async (ctx) => {
  const { id, db } = ctx.request.query;
  const res = await service.get(id, db);
  jsonWriter(ctx, res);
});

// resRouter.get('/list', VERSIONS_VALIDATE.list, service.list);
// resRouter.get('/types', service.getTypes);
// resRouter.get('/sub_types', VERSIONS_VALIDATE.getSubTypes, service.getSubTypes);

// // 新建 更新 删除
// resRouter.post('/create', VERSIONS_VALIDATE.create, service.add);
// resRouter.post('/update', VERSIONS_VALIDATE.update, service.update);
// resRouter.post('/delete', VERSIONS_VALIDATE.delete, service.delete);

module.exports = resRouter;
