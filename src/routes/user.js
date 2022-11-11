const { Router } = require('express');
const userRouter = Router();
const { db } = require("../../db")
const { Show } = require("../../models")

// import User model for manipulation
const { User }= require("../../models");

//Get all users from the databse using the endpoint /users
userRouter.get("/", async (req, res) => {
    const allUsers = await User.findAll();
    res.send(allUsers);
});

//Get one user from the database
userRouter.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.send(user);
});


//Get all the shows watched by a user
userRouter.get("/:id/shows", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    // const show = await Show.findByPk(3)
    // await user.setShows(show)
    const userShows = await Show.findAll({where: {userId: req.params.id}});
    res.json(userShows);
});

//Update and add a show if a user has watched it
userRouter.put("/:id/shows/:title", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.title);
    await user.setShows(show);
    res.sendStatus(202);
});


module.exports = userRouter