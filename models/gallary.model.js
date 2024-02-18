const mongoose =require('mongoose');
const {Schema} = mongoose;

const gallarySchema = new Schema ({
    image:{
        type: String,
        required: true,
    }
})
const Gallary  = mongoose.model('gallary',gallarySchema);

module.exports ={
    Gallary
}