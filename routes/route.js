const express = require("express");
const app = express()

const adminRoute = require("./admin-route")
app.use("/admin", adminRoute)

const foodRoute = require("./food-route")
app.use("/food", foodRoute)

module.exports = app;