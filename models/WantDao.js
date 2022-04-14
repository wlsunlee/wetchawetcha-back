const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getWantDao = async (movieId, userId) => {
    return await prisma.$queryRaw`
        select
            ifnull((select wa.want from wants wa join users ur on wa.user_id = ur.id where wa.movie_id = mo.id and ur.id = ${userId}), 'N') want_val
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

const createWantDao = async (movieId, userId) => {
    await prisma.$queryRaw`
        insert into wants (want, user_id, movie_id) values(true, ${userId}, ${movieId})`
}

const updateWantDao = async (movieId, userId, wantVal) => {
    console.log(wantVal)
    await prisma.$queryRaw`
        update wants set want = ${wantVal} where user_id = ${userId} and movie_id = ${movieId}`
}

module.exports = { getuserDao, getmovieDao, createWantDao, updateWantDao, getWantDao }