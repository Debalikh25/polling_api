const express = require('express')

const Router = express.Router();

const optionController = require('../controllers/option-controller')

Router.delete("/:id/delete" , optionController.delete)

Router.get("/:id/add_vote" , optionController.addVote)



module.exports = Router;