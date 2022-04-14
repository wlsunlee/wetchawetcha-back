const wantService = require("../services/WantService");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const want = async (req, res, next) => {

    try {
        const { movieId } = req.params;
        let userId;
        req.foundUser !== null ? userId = req.foundUser[0].id : userId = req.foundUser;

        const wantInfo = await wantService.getWant(movieId, userId);

        res.status(200).json({wantInfo : wantInfo});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const createWant = async (req, res, next) => {

    try {
        const { movieId } = req.body;
        let userId;
        req.foundUser !== null ? userId = req.foundUser[0].id : userId = req.foundUser;

        await wantService.wantCheck(movieId, userId, res);
        await wantService.createWant(movieId, userId);

        res.status(201).json({message : "create want"});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const updateWant = async (req, res, next) => {

    try {
        const { movieId, wantVal } = req.body;
        let userId;
        req.foundUser !== null ? userId = req.foundUser[0].id : userId = req.foundUser;

        await wantService.wantCheck(movieId, userId, res);
        await wantService.updateWant(movieId, userId, wantVal);

        res.status(200).json({message : "update WantTo"});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const error = (err, req, res, next) => {
    console.error(err);
}

module.exports = { error, createWant, updateWant, want }