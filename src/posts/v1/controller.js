const schemas = require("./schemas");
const service = require("./service");
const express = require("express");
const APIError = require("../../utils/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getPosts = async (req, res, next) => {
  try {
    const { limit, skip } = await schemas.QuerySchema.validateAsync(req.query);
    res.json(await service.fetchPosts(limit, skip));
  } catch (e) {
    next(new APIError(400, e.message));
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getPostById = async (req, res, next) => {
  try {
    const { id } = await schemas.IdSchema.validateAsync(req.params);
    const post = await service.fetchPostById(id);

    if (post) {
      return res.json(post);
    }

    next(new APIError(404, "Cannot find post..."));
  } catch (e) {
    next(new APIError(400, e.message));
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createPost = async (req, res, next) => {
  try {
    const post = await schemas.CreatePostSchema.validateAsync(req.body);
    const candidate = await service.fetchPostByTitle(post.title);

    if (!candidate) {
      return res.status(201).json(await service.savePost(post));
    }

    next(new APIError(400, "Post aleady exists"));
  } catch (e) {
    next(new APIError(400, e.message));
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updatePost = async (req, res, next) => {
  try {
    const { id } = await schemas.IdSchema.validateAsync(req.params);
    const payload = await schemas.UpdatePostSchema.validateAsync(req.body);

    const candidate = await service.fetchPostById(id);

    if (candidate) {
      await service.updatePostById(id, payload);
      return res.json(await service.fetchPostById(id));
    }

    next(new APIError(404, "Cannot find post..."));
  } catch (e) {
    next(new APIError(400, e.message));
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const removePost = async (req, res, next) => {
  try {
    const { id } = await schemas.IdSchema.validateAsync(req.params);
    const candidate = await service.fetchPostById(id);

    if (candidate) {
      await service.removePostById(id);
      return res.end();
    }
    next(new APIError(404, "Cannot find post..."));
  } catch (e) {
    next(new APIError(400, e.message));
  }
};

module.exports = {
  getPostById,
  getPosts,
  createPost,
  updatePost,
  removePost,
};
