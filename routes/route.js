const express = require("express");
const app = express()

const adminRoute = require("./admin-route")
app.use("/admin", adminRoute)

module.exports = app;