const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getRatingsDao = async () => {
    return await prisma.$queryRaw`
        select count(id) ratings_all from ratings`
}

const getMovieRatingsDao = async (movieId) => {
    return await prisma.$queryRaw`
        select 
            count(id) ratings_total, 
            truncate(avg(count),1) ratings_avg 
        from ratings 
        where movie_id = ${movieId}`
}

const getUserRatingDao = async (movieId, userId) => {
    return await prisma.$queryRaw`
        select
            ifnull((select ra.count from ratings ra join users ur on ra.user_id = ur.id where ra.movie_id = mo.id and ur.id = ${userId}), 'N') rating_val
        from movies mo
        where mo.id = ${movieId}`
}

const getuserDao = async (userId) => {
    return await prisma.$queryRaw`
        select id from users where id = ${userId}`
}

const getmovieDao = async (movieId) => {
    return await prisma.$queryRaw`
        select id from movies where id = ${movieId}`
}

const createRatingDao = async (ratingVal, movieId, userId) => {
    return await prisma.$queryRaw`
        insert into ratings (user_id, movie_id, count) values(${userId}, ${movieId}, ${ratingVal})`
}

const updateRatingDao = async (ratingVal, movieId, userId) => {
    return await prisma.$queryRaw`
        update ratings set count = ${ratingVal} where user_id = ${userId} and movie_id = ${movieId}`
}

const deleteRatingDao = async (movieId, userId) => {
    return await prisma.$queryRaw`
        delete from ratings where user_id = ${userId} and movie_id = ${movieId}`
}

module.exports = { getuserDao, getmovieDao, createRatingDao, updateRatingDao, deleteRatingDao, getMovieRatingsDao, getUserRatingDao, getRatingsDao }
