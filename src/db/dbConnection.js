const mongoose=require('mongoose');

module.exports.dbConnection=function(){
mongoose.set("strictQuery", true);
mongoose.connect(process.env.URI,{useNewUrlParser: true,}).then(() => console.log("mongo Db is connected 🟢"))
.catch((err) => console.log('connection error with mongoDb : ',err.message));
}
