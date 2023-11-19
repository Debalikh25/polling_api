const express = require('express');

const Router = express.Router();

const questionController  = require("../controllers/question-controller")

Router.post("/create" , questionController.create)

Router.post("/:id/options/create" , questionController.createOptions)


Router.delete("/:id/delete" , questionController.deleteQuestion)

Router.get("/:id" , questionController.getQuestion)


module.exports = Router;