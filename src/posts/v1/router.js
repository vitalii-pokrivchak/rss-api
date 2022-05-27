const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getPosts);
router.get("/:id", controller.getPostById);
router.post("/", controller.createPost);
router.patch("/:id", controller.updatePost);
router.delete("/:id", controller.removePost);

module.exports = router;
