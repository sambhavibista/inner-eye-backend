const mongoose =require('mongoose');
const {Schema} = mongoose;

const ebookSchema = new Schema ({
    name:{
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true
    }
})
const ebookRequest  = mongoose.model('ebookRequest',ebookSchema);

module.exports ={
    ebookRequest
}