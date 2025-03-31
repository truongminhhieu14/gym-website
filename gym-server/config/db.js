const moogoose = require("mongoose")


async function connectDB() {
    try {
        moogoose.connect(process.env.MONGODB_URL)
        
    } catch (error) {
        console.log(error)        
    }    
}

module.exports = connectDB