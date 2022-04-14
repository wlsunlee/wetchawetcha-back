const ratingsService = require("../services/RatingsService");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const allRatings = async (req, res, next) => {

    try {
        const allRatings = await ratingsService.getAllRatings();
        
        res.status(200).json({allRatings : allRatings});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const movieRatings = async (req, res, next) => {

    try {
        const { movieId } = req.params;

        const movieRatingsInfo = await ratingsService.getMovieRatings(movieId);        

        res.status(200).json({movieRatingsInfo : movieRatingsInfo});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const userRating = async (req, res, next) => {

    try {
        const { movieId } = req.params;
        let userId;
        req.foundUser !== null ? userId = req.foundUser[0].id : userId = req.foundUser;
        
        const userRatingInfo = await ratingsService.getUserRating(movieId, userId);

        res.status(200).json({userRatingInfo : userRatingInfo});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const createRating = async (req, res, next) => {

    try {
        const { movieId, ratingVal } = req.body;
        let userId;
        req.foundUser !== null ? userId = req.foundUser[0].id : userId = req.foundUser;

        await ratingsService.ratingCheck(ratingVal, movieId, userId, res);
        await ratingsService.createRating(ratingVal, movieId, userId, res);

        res.status(201).json({message : "create rating"});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const updateRating = async (req, res, next) => {

    try {
        const { movieId, ratingVal } = req.body;
        let userId;
        req.foundUser !== null ? userId = req.foundUser[0].id : userId = req.foundUser;

        await ratingsService.ratingCheck(ratingVal, movieId, userId, res);
        await ratingsService.updateRating(ratingVal, movieId, userId, res);

        res.status(200).json({message : "update rating"});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const deleteRating = async (req, res, next) => {

    try {
        const { movieId } = req.params;
        let userId;
        req.foundUser !== null ? userId = req.foundUser[0].id : userId = req.foundUser;
        
        await ratingsService.deleteRating(movieId, userId);

        res.status(204).json({message : "delete rating"});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const error = (err, req, res, next) => {
    console.error(err);
}

module.exports = { error, createRating, updateRating, deleteRating, movieRatings, userRating, allRatings }
