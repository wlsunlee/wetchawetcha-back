const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserDao = require('../models/UserDao');

const signUp = async (email, password, username) => {
  if (password.length < 8) {
    const error = new Error('PASSWORD_TOO_SHORT');
    error.statusCode = 400;
    throw error;
  }

  const user = await UserDao.getUserByEmail(email);

  if (user.length !== 0) {
    const error = new Error('EXISTING_USER');
    error.statusCode = 409;
    throw error;
  }

  const encryptedPW = bcrypt.hashSync(password, bcrypt.genSaltSync());

  const newUser = await UserDao.createUser(email, encryptedPW, username);

  return newUser;
};

const checkEmail = async email => {
  const user = await UserDao.getUserByEmail(email);
  if (user.length == 0) {
    return false;
  } else {
    return true;
  }
};

//채원 sigIn 코드
const signIn = async (email, password) => {

  const user = await UserDao.getUserByEmail(email) //
  console.log('login id got: ', user[0].id)
  
  //email에 대한 정보가 존재하지 않는다면
  if (user[0].length === 0) {
      console.log("email문제")
      const error = new Error('INVALID_USER')
      error.statusCode = 400
      throw error
  }

  const checkPassword = bcrypt.compareSync(password, user[0].password); //db에 저장된 비밀번호 비교

  //비밀번호가 틀렸을 때 
  if (!checkPassword) {
      console.log("비밀번호 틀림")
      const error = new Error('INVALID_USER')
      error.statusCode = 400
      throw error
  }
      const token = jwt.sign(JSON.stringify(user[0].id), process.env.SECRET_KEY);
      user.token = token;

      return token;   //controller로 보냄

}


const findUser = async (id) => {
  const findUser = await UserDao.findUser(id);

  return findUser;
};

module.exports = { signUp, checkEmail, signIn,findUser  };
