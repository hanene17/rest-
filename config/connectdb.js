const mongoose= require("mongoose")
require('dotenv').config({ path: './.env' })
const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGOdb_URI, {useNewUrlParser: true, 
            useUnifiedTopology: true});
        console.log("db successfuly connected")
    }
    catch (error) {
        console.log(error)
    }
}

module.exports=connectdb