const mongoose = require("mongoose");
const Question = require("../models/Question");
const Option = require("../models/Option");

//GET -> Create a new Question in DB without options
module.exports.create = async (req, res) => {
  try {
    const newQuestion = await Question.create({
      title: req.body.title,
    });

    return res.status(200).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

//Post -> Create options for a Question
module.exports.createOptions = async (req, res) => {
  try {
    const questionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(404).json({
        error: "Question Not Found",
      });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        error: "Question Not Found",
      });
    }

    let newOption = await Option.create({
      text: req.body.text,
    });

    newOption.linkToVote = `http://localhost:3000/options/${newOption._id}/add_vote`;
    newOption = await newOption.save();

    question.options.push(newOption);

    await question.save();

    return res.status(200).json({
      message: "Option Added to Question",
      option: newOption,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

//DELETE -> Delete a question along with its options
module.exports.deleteQuestion = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        error: "Question Not Found",
      });
    }
    const question = await Question.findById(req.params.id).populate("options");

    if (!question) {
      return res.status(404).json({
        error: "Question Not Found",
      });
    }
   
     const deleted = await Question.findByIdAndDelete(req.params.id);
      
     await Option.deleteMany({_id : {$in : deleted.options}})

    return res.status(200).json({
      message: "Question Deleted !",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

//GET -> fetch a question with its options from DB by passing the question id
module.exports.getQuestion = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        error: "Question Not Found",
      });
    }
    const question = await Question.findById(req.params.id).populate("options");

    if (!question) {
      return res.status(404).json({
        error: "Question Not Found",
      });
    }

    return res.status(200).json(question);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
