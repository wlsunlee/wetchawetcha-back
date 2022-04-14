
const movieDao = require("../models/MovieDao");
const errService = require("./errorService");



const getSortedMoviesByWant = async (limit) => {
    return  await movieDao.getSortedMoviesByWant(limit);
  };

const getMovieByGenre= async (genreName) => {
	return await movieDao.getMovieByGenre(genreName)
}


const SearchMoviesByKeyword = async (keyword) => {
    const MovieDatas = await movieDao.getMovies_Search(keyword);
    
    const searchedMovies={
  "keyword":keyword,
  "MovieList":MovieDatas
    }
  
    return searchedMovies;
};

const getWatchaCollection = async (partitionLimit, res) => {
    if(partitionLimit <= 0 || partitionLimit > 12) {
        errService.errorHandler(400, "BAD_REQUEST", res);
    }
    return await movieDao.getWatchaCollectionDao(partitionLimit);
}

const getMovie = async (id, res) => {
    const movieData = await movieDao.getMovieDao(id);

    if(!movieData) {
        errService.errorHandler(400, "BAD_REQUEST", res);
    }
    return movieData;
}

const getMovieImages = async (id, res) => {
    const movieImagesData = await movieDao.getmovieImagesDao(id);

    if(!movieImagesData) {
        errService.errorHandler(400, "BAD_REQUEST", res);
    }
    return movieImagesData;
}

const getMovieByCategory = async (CategoryId, limit, res) => {
    const CategoryData = await movieDao.CategoryData(CategoryId, limit);
  
    return CategoryData;
};

module.exports = { getMovie, getMovieImages, getMovieByCategory, getWatchaCollection, SearchMoviesByKeyword, getMovieByGenre,getSortedMoviesByWant }
