const express = require('express');
const PORT = 5000
const app =  express();
const mongoose = require('mongoose');
const {MONGO_URL} = require('./keys');

app.use(express.json());

mongoose.connect(MONGO_URL , {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected' , ()=>{
    console.log("Succesfully Connected");

})
mongoose.connection.on('error',(err)=>{
    console.log('Error in connection ' , err);
})

require('./models/user')
require('./models/post')
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))



app.listen(PORT , ()=>{
    console.log("Server is running on" , PORT);
})  