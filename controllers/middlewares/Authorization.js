const { UserDao } = require("../../models/UserDao");
const UserService = require("../../services/UserService");
const jwt = require("jsonwebtoken"); //채원님 이게 없었어요

const Authorization = async (req, res, next) => {
  try {

    const cookies = parseCookies(req.headers.cookie);
    const token = cookies.access_token;

    if (!token||token=="") {
      req.foundUser = null; 
      next();
    }else{
      const data = jwt.verify(token, process.env.SECRET_KEY,  (error, decoded) => {

        if (error) {
          return res.status(400).json({ message: "WRONG_TOKEN" });
        }
        if (decoded) {
    
          user_info = jwt.verify(token,process.env.SECRET_KEY);
       
        }
      });

      const foundUser = await UserService.findUser(user_info);

      if (!foundUser) {
        // 이 토큰을 가진 유저가 데이터베이스에 없으면 404 에러를 냅니다.
        return res.status(404).json({ message: "USER_NOT_FOUND" });
      }else{

        req.foundUser = foundUser; 
        next();

      }

    }
  } catch {
    return res.sendStatus(403);
  }
};


const parseCookies = (cookie = "") => {
  return cookie
    .split(";")
    .map(v => v.split("="))
    .map(([k, ...vs]) => [k, vs.join("=")])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
};

module.exports = { Authorization };
