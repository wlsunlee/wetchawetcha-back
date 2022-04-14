const CommentService = require("../services/CommentService");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CommentList = async (req, res, next) => {
  try {
    const movieId = req.query.movieId;

    const CommentData = await CommentService.CommentList(movieId);

    res.status(201).json({ CommentData });
  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

const CommentAdd = async (req, res, next) => {
  try {
    const { comment, movieId } = req.body;
    let userId = req.foundUser;
    
    if(req.foundUser !== null) {
      userId = req.foundUser[0].id;
    }
    
    CommentService.CommentUserIdCheck(userId, res);
    const CommentAdd = await CommentService.CommentAdd(movieId, comment, userId);

    res.status(201).json({ SUCCESS: "COMMENT_INSERT" });
  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

const CommentSelect = async (req, res, next) => {
  try {
    const movieId = req.query.movieId;
    let userId = req.foundUser;

    if(req.foundUser !== null) {
      userId = req.foundUser[0].id;
    }

    CommentService.CommentUserIdCheck(userId, res);

    const CommentResult = await CommentService.CommentSelect(movieId, userId);

    res.status(201).json({ CommentResult });
  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

const CommentModify = async (req, res, next) => {
  try {    
    const { comment, movieId } = req.body;
    let userId = req.foundUser;
    
    if(req.foundUser !== null) {
      userId = req.foundUser[0].id;
    }
    
    CommentService.CommentUserIdCheck(userId, res);

    const CommentResult = await CommentService.CommentModify(
      movieId,
      userId,
      comment
    );

    res.status(201).json({ SUCCESS: "COMMENT_MODIFY" });
  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

const CommentDelete = async (req, res, next) => {
  try {
    const movieId = req.query.movieId;
    let userId = req.foundUser;
    
    if(req.foundUser !== null) {
      userId = req.foundUser[0].id;
    }
    
    CommentService.CommentUserIdCheck(userId, res);
    const CommentResult = await CommentService.CommentDelete(movieId, userId);

    res.status(201).json({ SUCCESS: "COMMENT_DELETE" });
  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

const CommentLikePush = async (req, res, next) => {
  try {
    const { commentId } = req.body;
    let userId = req.foundUser;
    
    if(req.foundUser !== null) {
      userId = req.foundUser[0].id;
    }
    
    CommentService.CommentUserIdCheck(userId, res);
    const CommentResult = await CommentService.CommentLikePush(commentId, userId);

    res.status(201).json({ SUCCESS: "COMMENTLIKE_PLUS" });
  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

const CommentLikeDelete = async (req, res, next) => {
  try {
    const commentId = req.query.commentId;
    let userId = req.foundUser;
    
    if(req.foundUser !== null) {
      userId = req.foundUser[0].id;
    }
    
    CommentService.CommentUserIdCheck(userId, res);
    const CommentResult = await CommentService.CommentLikeDelete(commentId, userId);

    res.status(201).json({ SUCCESS: "COMMENTLIKE_DELETE" });
  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

const CommentLikeGet = async (req, res, next) => {
  try {
    const commentId = req.query.commentId;

    const CommentLikeResult = await CommentService.CommentLikeGet(commentId);

    res.status(201).json({ CommentLikeResult });

  } catch (error) {
    next(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};



const CommentLikeCheck = async (req, res, next) => {
  try {
    const commentId = req.query.commentId;

   let userId=0;
    if(req.foundUser !== null) {
      userId = req.foundUser[0].id;
    }
  else{userId=null}

    CommentService.CommentUserIdCheck(userId, res);
    
    const CommentLike  = await CommentService.CommentLikeCheck(commentId ,userId);
    res.status(201).json({ CommentLike});

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
  error,
  CommentList,
  CommentAdd,
  CommentSelect,
  CommentModify,
  CommentDelete,
  CommentLikePush,
  CommentLikeDelete,
  CommentLikeGet,
  CommentLikeCheck
};
