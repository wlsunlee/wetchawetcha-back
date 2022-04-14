const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CommentList = async (movieId) => {
  const CommentList = await prisma.$queryRaw`
  SELECT A.id AS comment_id, C.id ,C.name , A.comment ,(SELECT count(B.comment_id) from users_comments_likes B where comment_id = A.id group by B.comment_id) AS count 
        FROM 
        comments A 
        LEFT JOIN  users_comments_likes B on A.user_id = B.user_id
        LEFT JOIN users C on A.user_id = C.id
        WHERE A.movie_id = ${movieId}
        GROUP BY  A.comment , A.id;`;

  return CommentList;
};

const commentRating = async (movieId) => {
  const CommentList = await prisma.$queryRaw`
  SELECT A.id , B.count , C.want 
        FROM 
        users A 
        LEFT JOIN  ratings B on A.id = B.user_id
        LEFT join wants C on A.id = C.user_id
        RIGHT JOIN comments D on A.id  = D.user_id 
        WHERE C.movie_id is null or C.movie_id = ${movieId}
        GROUP BY A.id , B.count, B.movie_id , C.want
        HAVING movie_id is null or movie_id = ${movieId} 
`;
  return CommentList;
};

const CommentAdd = async (movie_id, comment, id) => {
  const CommentInsert = await prisma.$queryRaw`
  INSERT INTO comments (comment , user_id, movie_id) 
  VALUES (${comment}, ${id} , ${movie_id})
`;
  return CommentInsert;
};

const CommentSelect = async (movie_id, id) => {
  const CommentSelect2 = await prisma.$queryRaw`
  SELECT comment 
  FROM comments 
  WHERE user_id = ${id} and movie_id = ${movie_id};
`;
  return CommentSelect2;
};

const CommentModify = async (movie_id, id, comment) => {
  const CommentModify = await prisma.$queryRaw`
  UPDATE comments 
  SET comment = ${comment} 
  WHERE user_id = ${id} and movie_id = ${movie_id};
`;
  return CommentModify;
};

const CommentDeleteSelect = async (movie_id, id) => {
  const CommentDeleteSelect = await prisma.$queryRaw`
  select id from comments where movie_id = ${movie_id} and user_id =${id};
`;
  return CommentDeleteSelect;
};

const CommentDeleteLike = async (comment_id) => {
  const CommentDeleteLike = await prisma.$queryRaw`
  DELETE FROM users_comments_likes 
  WHERE comment_id = ${comment_id};
`;
  return CommentDeleteLike;
};

const CommentDelete = async (movie_id, id) => {
  const CommentDelete = await prisma.$queryRaw`
  DELETE FROM comments
   WHERE movie_id = ${movie_id} and user_id = ${id};
`;
  return CommentDelete;
};

const CommentLikePush = async (comment_id, id) => {

  const CommentLikePush = await prisma.$queryRaw`
  INSERT INTO users_comments_likes 
  (comment_id, user_id) values(${comment_id}, ${id});
`;
  return CommentLikePush;
};

const CommentLikeDelete = async (comment_id, id) => {
  const CommentLikeDelete = await prisma.$queryRaw`
  DELETE 
  FROM users_comments_likes 
  WHERE comment_id= ${comment_id} and user_id=${id};
`;
  return CommentLikeDelete;
};

const CommentLikeGet = async (comment_id, id) => {
  const CommentLikeGet = await prisma.$queryRaw`
  SELECT count(B.comment_id) AS count
  FROM users_comments_likes B 
  WHERE comment_id = ${comment_id} 
  GROUP BY B.comment_id ;
`;
  return CommentLikeGet;
};

const CommentLikeCheck = async (comment_id, user_id) => {
  const CommentLikeGet = await prisma.$queryRaw`
  SELECT users_comments_likes.id
  FROM users_comments_likes
  WHERE users_comments_likes.comment_id = ${comment_id} AND users_comments_likes.user_id = ${ user_id};
`;
  return CommentLikeGet;
};

module.exports = {
  CommentList,
  commentRating,
  CommentAdd,
  CommentSelect,
  CommentModify,
  CommentDelete,
  CommentDeleteSelect,
  CommentDeleteLike,
  CommentLikePush,
  CommentLikeDelete,
  CommentLikeGet,
  CommentLikeCheck
};
