const ratingsDao = require("../models/RatingsDao");
const errService = require("./errorService");

const getAllRatings = async () => {
    return await ratingsDao.getRatingsDao();
}

const getMovieRatings = async (movieId) => {
    return await ratingsDao.getMovieRatingsDao(movieId);
}

const getUserRating = async (movieId, userId) => {

    if(userId === undefined || userId === null) {
        return null;
    }

    return await ratingsDao.getUserRatingDao(movieId, userId);
}

const ratingCheck = async (ratingVal, movieId, userId, res) => {

    if(ratingVal <= 0) {
        errService.errorHandler(400, "BAD_REQUEST", res);
    }
    const movie = await getmovie(movieId);

    if(movie.length === 0) {       
        errService.errorHandler(400, "BAD_REQUEST", res);
    }    
    const user = await getuser(userId);

    if(user.length === 0) {
        errService.errorHandler(409, "EXSITING_USER", res);
    }

}

const getuser = async (userId) => {
    return await ratingsDao.getuserDao(userId);
}

const getmovie = async (movieId) => {
    return await ratingsDao.getmovieDao(movieId);
}

const createRating = async (ratingVal, movieId, userId) => {
    await ratingsDao.createRatingDao(ratingVal, movieId, userId);
}

const updateRating = async (ratingVal, movieId, userId) => {
    await ratingsDao.updateRatingDao(ratingVal, movieId, userId);
}

const deleteRating = async (movieId, userId) => {    
    await ratingsDao.deleteRatingDao(movieId, userId);
}

module.exports = { ratingCheck, createRating, updateRating, deleteRating, getMovieRatings, getUserRating, getAllRatings }
