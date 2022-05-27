const Post = require("./model");

/**
 * Get all posts from database
 *
 * @param {number} limit
 * @param {number} skip
 * @returns {Promise<Query<any[], any, {}, any>>}
 */
const fetchPosts = async (limit, skip) =>
  await Post.find().limit(limit).skip(skip);

/**
 * Get only one post from database by id
 *
 * @param {string} id
 * @returns {Promise<Query<any, any, {}, any>>}
 */
const fetchPostById = async (id) => await Post.findById(id);

/**
 * Get only one post from database by title
 *
 * @param {string} title
 * @returns {Promise<Query<any, any, {}, any>>}
 */
const fetchPostByTitle = async (title) => await Post.findOne({ title: title });

/**
 * Save post to database
 *
 * @param {{ title:string , link?: string, description: string, categories: [string] , creator: string, metadata?: [string, boolean ,number] }} post
 * @returns {Promise<any>}
 */
const savePost = async (post) => await Post.create(post);

/**
 * Update post by id and save to database
 *
 * @param {string} id
 * @param {{ title?:string, link?:string, description?:string, creator?:string }} post
 * @returns {Promise<Query<any, any, {}, any>>}
 */
const updatePostById = async (id, post) =>
  await Post.findByIdAndUpdate(id, post);

/**
 * Remove post by id from database
 *
 * @param {string} id
 * @returns {Promise<Query<any, any, {}, any>>}
 */
const removePostById = async (id) => await Post.findByIdAndDelete(id);

module.exports = {
  fetchPosts,
  fetchPostById,
  savePost,
  updatePostById,
  removePostById,
  fetchPostByTitle,
};
