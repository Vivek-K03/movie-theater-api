const { Router } = require('express');
const showsRouter = Router();
const { db } = require("../../db")

// import Show model for manipulation
const { User, Show } = require("../../models")

//The Show router gets all the shows from the database using /shows
showsRouter.get("/", async (req, res) => {
    const shows = await Show.findAll();
    res.send(shows);
});

//Gets one show from the database using an endpoint
showsRouter.get("/:id", async (req, res) => {
    const shows = await Show.findByPk(req.params.id);
    res.send(shows);
})

//Gets the shows of a specific genre using an endpoint
showsRouter.get("/genres/:id", async (req, res) => {
    const shows = await Show.findAll({where: {genre: req.params.id}});
    res.send(shows);
});

//Update the rating on a specific show
showsRouter.put("/:id/rating/:rating", async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    await show.update({rating: req.params.rating});
    res.sendStatus(202);
});

//Update the status on a specific show from 'cancelled' to 'on-going' or vice versa
showsRouter.put("/:id/updates", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    if (show.status === 'on-going') {
        await show.update({status: 'cancelled'})
    } else {
        await show.update({status: 'on-going'})
    }
    res.sendStatus(202);
});

//Should delete a show
showsRouter.delete("/:id/delete", async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    await show.destroy();
    res.send(`Deleted Show: ${show.title}`);
});





module.exports = showsRouter
