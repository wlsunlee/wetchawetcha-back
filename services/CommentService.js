const CommontDao = require("../models/CommentDao");
const errService = require("./errorService");

const CommentList = async (movieId, res) => {
  const CommentList = await CommontDao.CommentList(movieId);
  const CommentRating = await CommontDao.commentRating(movieId);

  const result = CommentList.map((value, index) => {
    return Object.assign(value, CommentRating[index]);
  });

  return result;
};

const CommentAdd = async (movie_id, comment, id, res) => {
  const CommentAdd = await CommontDao.CommentAdd(movie_id, comment, id);

  return CommentAdd;
};

const CommentSelect = async (movie_id, id, res) => {
  const CommentSelect = await CommontDao.CommentSelect(movie_id, id);

  return CommentSelect;
};

const CommentModify = async (movie_id, id, comment, res) => {
  const CommentModify = await CommontDao.CommentModify(movie_id, id, comment);

  return CommentModify;
};

const CommentDelete = async (movie_id, id, res) => {
  const CommentDeleteSelect = await CommontDao.CommentDeleteSelect(
    movie_id,
    id
  );

  const CommentDeleteLike = await CommontDao.CommentDeleteLike(
    CommentDeleteSelect[0].id
  );
  const CommentDelete = await CommontDao.CommentDelete(movie_id, id);

  return CommentDelete;
};

const CommentLikePush = async (comment_id, id, res) => {
  const CommentLikePush = await CommontDao.CommentLikePush(comment_id, id);

  return CommentLikePush;
};

const CommentLikeDelete = async (comment_id, id, res) => {
  const CommentLikeDelete = await CommontDao.CommentLikeDelete(comment_id, id);

  return CommentLikeDelete;
};

const CommentLikeGet = async (comment_id, res) => {
  const CommentLikeGet = await CommontDao.CommentLikeGet(comment_id);

  return CommentLikeGet;
};


const CommentLikeCheck=async (comment_id,user_id)=>{
  const CommentLike = await CommontDao.CommentLikeCheck(comment_id,user_id);
  return CommentLike;
}

const CommentUserIdCheck = (userId, res) => {
  if(userId === undefined || userId === null) {
    errService.errorHandler(400, "undefined user", res);
  }
};



module.exports = {
  CommentList,
  CommentAdd,
  CommentSelect,
  CommentModify,
  CommentDelete,
  CommentLikePush,
  CommentLikeDelete,
  CommentLikeGet,
  CommentUserIdCheck,
  CommentLikeCheck
};
