const mongoose = require('mongoose');

const connectToDB  = async ()=>{
    
    try{
          await mongoose.connect(`mongodb+srv://${process.env.mongoDBUsername}:${process.env.mongoDBPassword}@mernproject.qih3s.mongodb.net/?retryWrites=true&w=majority`)
          console.log('Connection Established With Database !');
    }
    catch(err){
        console.log(`Error occured connecting to database : ${err.message}`);
    }

}

module.exports = connectToDB;