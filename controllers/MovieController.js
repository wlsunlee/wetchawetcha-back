const movieService = require("../services/MovieService");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const MoviesBy = async (req, res, next) => {
  try {
    if (!!req.query.search) {
      const searchedMovies = await movieService.SearchMoviesByKeyword(
        req.query.search
      );
      res.status(201).json({ searchedMovies });
    } else if (!!req.query["genre-name"]) {
      const Movie = await movieService.getMovieByGenre(req.query["genre-name"]);
      res.status(200).json({ Movie });
    } else if (!!req.query["ordering"]) {
      if (req.query["ordering"] == "want") {
        const movies = await movieService.getSortedMoviesByWant(req.query.limit);
        res.status(200).json({ movies });
      }
    } else if (!! req.query["category-id"]) {
      const movies = await movieService.getMovieByCategory(
        req.query["category-id"],
        req.query.limit
      );
      res.status(201).json({ movies });
    } else if(!! req.query["grouping"]){
        if(req.query["grouping"]=="category"){
          const { partitionLimit } = req.query;

          const watchaCollectionData = await movieService.getWatchaCollection(
            partitionLimit,
            res
          );
          res.status(200).json({ watchaCollectionData: watchaCollectionData });
        }
    }

  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};


/*    
    -movie_story의 값 프론트에서 테스트 후 \r\n -> <br/> 필요시 변경    
*/
const movie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movieInfo = await movieService.getMovie(id, res);

    //줄바꿈 (movie_story)
    //detailViewInfo[0].movie_story = detailViewInfo[0].movie_story.replaceAll("\r\n","<br/>");
    //console.log(detailViewInfo[0].movie_story);

    res.status(200).json({ movieInfo: movieInfo });
  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

const movieImages = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movieImages = await movieService.getMovieImages(id, res);

    res.status(200).json({ movieImages: movieImages });
  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};


const error = (err, req, res, next) => {
  console.error(err);
};

module.exports = {
  movie,
  error,
  movieImages,
  MoviesBy,
};
