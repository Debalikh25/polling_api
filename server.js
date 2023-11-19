const express = require('express');
const port = process.env.PORT || 3000;
const connectToDB = require('./config/db')
const rootRouter = require('./routes/root-routes')
const app  = express();

app.use(express.json())

connectToDB();


app.use("/" , rootRouter);

app.listen(port , (err)=>{
    if(err){
        console.log(`Error Occured : ${err.message}`)
        return ;
    }

    console.log(`Server is listening on port ${port}`)
})