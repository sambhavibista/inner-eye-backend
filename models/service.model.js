const mongoose = require('mongoose');
const {Schema} = mongoose;

const serviceSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})
const Service = mongoose.model('Service',serviceSchema);

module.exports ={
    Service
}