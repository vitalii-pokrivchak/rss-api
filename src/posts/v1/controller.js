const schemas = require("./schemas");
const service = require("./service");
const express = require("express");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getPosts = async (req, res) => {
  try {
    const { limit, skip } = await schemas.QuerySchema.validateAsync(req.query);
    res.json(await service.fetchPosts(limit, skip));
  } catch (e) {
    res.status(400).json({ code: 400, message: e.message });
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getPostById = async (req, res) => {
  try {
    const { id } = await schemas.IdSchema.validateAsync(req.params);
    const post = await service.fetchPostById(id);

    if (post) {
      return res.json(post);
    }

    res.status(404).json({ code: 404, message: "Cannot find post..." });
  } catch (e) {
    res.status(400).json({ code: 400, message: e.message });
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createPost = async (req, res) => {
  try {
    const post = await schemas.CreatePostSchema.validateAsync(req.body);
    const candidate = await service.fetchPostByTitle(post.title);

    if (!candidate) {
      return res.json(await service.savePost(post));
    }

    res.status(400).json({ code: 400, message: `Post aleady exists` });
  } catch (e) {
    res.status(400).json({ code: 400, message: e.message });
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updatePost = async (req, res) => {
  try {
    const { id } = await schemas.IdSchema.validateAsync(req.params);
    const payload = await schemas.UpdatePostSchema.validateAsync(req.body);

    const candidate = await service.fetchPostById(id);

    if (candidate) {
      await service.updatePostById(id, payload);
      return res.json(await service.fetchPostById(id));
    }

    res.status(404).json({ code: 404, message: "Cannot find post..." });
  } catch (e) {
    res.status(400).json({ code: 400, message: e.message });
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const removePost = async (req, res) => {
  try {
    const { id } = await schemas.IdSchema.validateAsync(req.params);
    const candidate = await service.fetchPostById(id);

    if (candidate) {
      await service.removePostById(id);
      return res.end();
    }

    res.status(404).json({ code: 404, message: "Cannot find post..." });
  } catch (e) {
    res.status(400).json({ code: 400, message: e.message });
  }
};

module.exports = {
  getPostById,
  getPosts,
  createPost,
  updatePost,
  removePost,
};
