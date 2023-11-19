const express = require('express');

const Router = express.Router();

const questionRouter  = require('./question-routes')

const optionRouter  = require('./option-routes')

Router.use('/questions' , questionRouter)
Router.use('/options' , optionRouter)

module.exports = Router;