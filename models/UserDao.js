const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserByEmail = async email => {
  return await prisma.$queryRaw`
		SELECT id, password FROM users WHERE email = ${email};
	`;
};

const createUser = async (email, encryptedPW, username) => {
  return await prisma.$queryRaw`
	INSERT INTO users(email, password, name) VALUES (${email}, ${encryptedPW},${username});
	`;
};


const findUser = async (id) => {
	const findUser = await prisma.$queryRaw`
	SELECT users.id AS id,
	users.name AS name
	FROM users 
	where id = ${id};`;
  
	return findUser;
  };

module.exports = { getUserByEmail, createUser ,findUser };
