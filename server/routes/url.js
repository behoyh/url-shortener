const express = require("express");
const { getSpecificUrl, createUrl } = require("../controller/urls");
const rateLimit = require("../middlewares/rateLimit");
const { isOptionallyAuthenticated } = require("../middlewares/auth");

const urlRouter = new express.Router();

//This route is used to redirect to original url using short url as id
urlRouter.get("/:shortId", getSpecificUrl);
//This route is used to create short url
urlRouter.post("/", rateLimit, isOptionallyAuthenticated, createUrl);

module.exports = urlRouter;
