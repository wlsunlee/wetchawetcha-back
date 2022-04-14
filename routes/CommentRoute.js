const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/CommentController");
const authorMiddleware = require("../controllers/middlewares/Authorization");

router.get("/content", authorMiddleware.Authorization, CommentController.CommentSelect);
router.get("/", CommentController.CommentList);
router.post("/", authorMiddleware.Authorization, CommentController.CommentAdd);
router.put("/", authorMiddleware.Authorization, CommentController.CommentModify);
router.delete("/", authorMiddleware.Authorization, CommentController.CommentDelete);

router.post("/like", authorMiddleware.Authorization, CommentController.CommentLikePush);
router.delete("/like", authorMiddleware.Authorization, CommentController.CommentLikeDelete);
router.get("/like", CommentController.CommentLikeGet);
router.get("/like/check",  authorMiddleware.Authorization,CommentController.CommentLikeCheck);
router.use("/", CommentController.error);

module.exports = router;
