const express = require("express");
const router = express.Router();

const wantController = require("../controllers/WantController");
const authorMiddleware = require("../controllers/middlewares/Authorization");

router.get("/:movieId", authorMiddleware.Authorization, wantController.want);
router.post("/", authorMiddleware.Authorization, wantController.createWant);
router.patch("/", authorMiddleware.Authorization, wantController.updateWant);
router.use("/", wantController.error);

module.exports = router;