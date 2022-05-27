const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);

const CreatePostSchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().uri().optional(),
  description: Joi.string().required(),
  categories: Joi.array().items(
    Joi.string().required().label("category value")
  ),
  creator: Joi.string().required(),
  metadata: Joi.array()
    .items(
      Joi.object().pattern(
        /^/,
        Joi.alternatives()
          .try(Joi.string(), Joi.number(), Joi.boolean())
          .label("metadata value")
      )
    )
    .label("metadata value")
    .optional(),
});

const QuerySchema = Joi.object({
  limit: Joi.number().default(25),
  skip: Joi.number().default(0),
});

const IdSchema = Joi.object({
  id: Joi.objectId().required(),
});

const UpdatePostSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  creator: Joi.string().optional(),
  link: Joi.string().optional(),
  categories: Joi.array()
    .items(Joi.string().required().label("category value"))
    .optional(),
  metadata: Joi.array()
    .items(
      Joi.object().pattern(
        /^/,
        Joi.alternatives()
          .try(Joi.string(), Joi.number(), Joi.boolean())
          .label("metadata value")
      )
    )
    .label("metadata value")
    .optional(),
});

module.exports = {
  CreatePostSchema,
  QuerySchema,
  IdSchema,
  UpdatePostSchema,
};
