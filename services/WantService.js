const wantDao = require("../models/WantDao");
const errService = require("./errorService");

const getWant = async (movieId, userId) => {
    if(userId === undefined || userId === null) {
        return null;
    }
    return await wantDao.getWantDao(movieId, userId);
}

const wantCheck = async (movieId, userId, res) => {
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
    return await wantDao.getuserDao(userId);
}

const getmovie = async (movieId) => {
    return await wantDao.getmovieDao(movieId);
}

const createWant = async (movieId, userId) => {
    await wantDao.createWantDao(movieId, userId);
}

const updateWant = async (movieId, userId, wantVal) => {
    await wantDao.updateWantDao(movieId, userId, wantVal);
}

module.exports = { wantCheck, createWant, updateWant, getWant }