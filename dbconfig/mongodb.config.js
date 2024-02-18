const mongoose = require('mongoose');

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSOWORD;
async function connectMongodb(){
    try {
        await mongoose.connect (`mongodb://localhost:27017`)
        console.log("connected");
    } catch (error) {
        console.log(error);
        console.log('error connecting mongodb');
        process.exit(1);
    }
}
module.exports = connectMongodb;