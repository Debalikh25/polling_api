const mongoose = require("mongoose");
const Question = require("../models/Question");
const Option = require("../models/Option");

//DELETE -> Deletes an option if it has no votes
module.exports.delete = async(req, res) => {

     try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
              error: "Option Not Found",
            });
          }

          const option = await Option.findById(req.params.id);

          if (!option) {
            return res.status(404).json({
              error: "Option Not Found",
            });
          }

          if(option.votes > 0){
            return res.status(404).json({
                error: "Option cannot be deleted as it is voted by users",
              });
          }


          await option.deleteOne();

          return res.status(200).json({
            message : 'Option Deleted !'
          })
     }

     catch(err){
        return res.status(500).json({
            error: err.message,
          });
     }
};

//GET -> Adds a vote to an option
module.exports.addVote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        error: "Option Not Found",
      });
    }

    const option = await Option.findById(req.params.id);

    if (!option) {
      return res.status(404).json({
        error: "Option Not Found",
      });
    }

    option.votes++;

    await option.save();

    return res.status(200).json({
      message: "Vote Increased By One",
      option: option,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};


