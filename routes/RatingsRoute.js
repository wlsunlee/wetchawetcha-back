const express = require("express");
const router = express.Router();

const ratingsController = require("../controllers/RatingsController");
const authorMiddleware = require("../controllers/middlewares/Authorization");

router.get("/users-ratings", ratingsController.allRatings);
router.get("/movie-ratings/:movieId", ratingsController.movieRatings);
router.get("/:movieId", authorMiddleware.Authorization, ratingsController.userRating);
router.post("/", authorMiddleware.Authorization, ratingsController.createRating);
router.patch("/", authorMiddleware.Authorization, ratingsController.updateRating);
router.delete("/:movieId", authorMiddleware.Authorization, ratingsController.deleteRating);
router.use("/", ratingsController.error);

module.exports = router;