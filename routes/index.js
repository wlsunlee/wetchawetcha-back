const express = require('express');
const router = express.Router();
const cors = require("cors");


const movieRoute = require('./MovieRoute');
const ratingsRoute = require('./RatingsRoute');
const UserRouter = require('./UserRoute');
const CommentRoute = require("./CommentRoute");
const wantRoute = require('./WantRoute');
const errorRoute = require('./ErrorRoute');


router.use(cors());
router.use('/movie', movieRoute);
router.use('/rating', ratingsRoute);
router.use('/want', wantRoute);
router.use('/user', UserRouter);
router.use("/comment", CommentRoute);
router.use("/", errorRoute);

module.exports = router;