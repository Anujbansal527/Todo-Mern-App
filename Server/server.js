const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const Connection = require("./Config/Connection");
const UserRoute = require("./Routes/AuthRoutes")
const TodoRoutes = require("./Routes/TodoRoutes")

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use(cors());

app.use("/api/v1",UserRoute);
app.use("/api/v1",TodoRoutes);


Connection();

app.listen(PORT, () => {
    console.log(`Sucessfully connected to PORT ${PORT}`)
})