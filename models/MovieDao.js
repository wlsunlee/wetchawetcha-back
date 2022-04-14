const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getMovieByGenre  = async genreName => {
  
    const selectedMovies = await prisma.$queryRaw`
    SELECT
    movies.id AS id,
    movies.name AS name,
    movies.release_date AS release_date,
    movies.poster_url AS poster_url,
    movies_genre.genre_name AS genre,
    movies_country.country_name AS country
    FROM movies
    JOIN movies_genre ON movies.genre_id = movies_genre.id 
    JOIN movies_country ON movies.country_id = movies_country.id
    WHERE movies_genre.genre_name = ${genreName}
  `;
  return await selectedMovies;
};

const getMovies_Search = async keyword => {
    keyword = "%" + keyword + "%";
  return await prisma.$queryRaw`
  SELECT
  movies.id AS id,
  movies.name AS name,
  movies.release_date AS release_date,
  movies.poster_url AS poster_url,
  movies_genre.genre_name AS genre,
  movies_country.country_name AS country
  FROM movies
  JOIN movies_genre ON movies.genre_id = movies_genre.id 
  JOIN movies_country ON movies.country_id = movies_country.id
  WHERE movies.name LIKE ${keyword};`;
};

const getSortedMoviesByWant = async () => {
  return await prisma.$queryRaw`
  SELECT
  movies.name as name,
  wants.movie_id AS id,
  movies.poster_url as poster_url,
  movies.release_date AS release_date,
  movies_genre.genre_name AS genre_name,
  movies_country.country_name AS country_name,
  COUNT(movie_id) AS want_count
  FROM wants JOIN movies ON wants.movie_id = movies.id
  JOIN movies_genre ON movies.genre_id = movies_genre.id 
  JOIN movies_country ON movies.country_id = movies_country.id
  WHERE wants.want=1
  GROUP BY movie_id,want
  order by COUNT(movie_id) desc
  limit 20;`
};

const getWatchaCollectionDao = async (partitionLimit) => {
    return await prisma.$queryRaw`
        select 
            mcra.movie_id,
            mcra.category_id,
            ct.category_name,
            mcra.movie_rank,
            mo.poster_url
        from (
            select
                id,
                category_id,
                movie_id,
                rank() over (partition by mc.category_id order by mc.id) movie_rank
            from movies_categories mc
        ) mcra
        join categories ct
        on mcra.category_id = ct.id
        join movies mo
        on mo.id = mcra.movie_id
        where mcra.movie_rank <= ${partitionLimit}
        order by mcra.category_id, mcra.movie_rank`
}

const getMovieDao = async (id) => {
    return prisma.$queryRaw`
    select 
        mo.id movie_id,
        mo.name movie_name,
        mo.release_date,
        (select genre_name from movies_genre where id = mo.genre_id) genre_name,
        (select country_name from movies_country where id = mo.country_id) country_name,
        mo.run_time,
        mo.age movie_age,    
        mo.story movie_story,
        mo.poster_url    
    from movies mo
    where mo.id = ${id}`;
}

const getmovieImagesDao = async (id) => {
    return prisma.$queryRaw`
    select 
        url images_url 
    from images 
    where movie_id = ${id}`;
}

const CategoryData = async (CategoryId, limit) => {
  const selectcategories = await prisma.$queryRaw`
    SELECT 
    A.id, A.name, A.poster_url, A.release_date , B.country_name , C.genre_name , D.category_name
    FROM movies A
    join movies_country B on  A.country_id = B.id
    join movies_genre C on A.genre_id = C.id
    join movies_categories F on A.id = F.movie_id
    join categories D on F.category_id = D.id
    where category_id = ${CategoryId}
    Limit ${limit}
    ;`;

  return selectcategories;
};

module.exports = { getMovieDao, getmovieImagesDao, CategoryData, getWatchaCollectionDao, getMovies_Search ,getMovieByGenre,  getSortedMoviesByWant}