const express = require("express") // importing express and assigning app with express
const app = express()
const { body, valdiationResult } = require('express-validator');
const { db } = require("../db");
const userRouter = require("./routes/user")
const showsRouter = require("./routes/shows")


// add a json parson to the webserver
app.use(express.json());
app.use("/users", userRouter);
app.use("/shows", showsRouter)

app.listen(3000, () => {
    console.log("Yes i work")
});                                             // listening on port 3000


