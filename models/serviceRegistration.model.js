const mongoose =require('mongoose');
const {Schema} = mongoose;

const serviceRegistrationSchema = new Schema ({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required :true
    },
    phone: {
        type:String,
        required:true
    },
    service: {
        type : Schema.Types.ObjectId,
        ref: 'Service',
    }
})

const ServiceRegistration = mongoose.model('ServiceRegistration',serviceRegistrationSchema);

module.exports = {
    ServiceRegistration
}