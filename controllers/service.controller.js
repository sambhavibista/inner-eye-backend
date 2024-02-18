const {Service} = require ('../models/service.model');
const { errorHandler } = require('../utils/errorHandler');

const createService = async(req,res) => {
    const{title,description}= req.body;
    console.log(req.user);
    try {   
        const service = await Service.create({title,description});
        return res.status(201).json({
            message:"service created succesfully",
            data:service,
            success: true,
            statusCode: 201,
        });
    } catch (error) {
        errorHandler(error,res);
    }
}
const getServices = async (req,res)=>{
    try {
        const services = await Service.find();
        if(!services){
            return res.status(404).json({
                message:"service not found",
                data:services,
                success:false,
                statusCode: 404,
            });
        }
        return res.status(200).json({
            message:"service retrived successfully",
                data:services,
                success:true,
                statusCode: 200,
        });
    } catch (error) {
        errorHandler(error,res);
    }
}
const updateService = async(req,res)=>{
    const {id}=req.params;
    const {title, description}= req.body;
    try {
        const serviceUpdate = await Service.findByIdAndUpdate(
            id,
            {
                title,
                description,
            },
            {
                new: true,
            }
        );
        if(!serviceUpdate){
            return res.status(404).json({
                message:"service not found",
                data:serviceUpdate,
                success:false,
                statusCode: 404,
            })
        }
        return res.status(200).json({
            message:"service retrived successfully",
                data:serviceUpdate,
                success:true,
                statusCode: 200,
        });

    } catch (error) {
        errorHandler(error,res);
    }
}

const deleteService = async (req,res)=>{
    const {id} = req.params;
    const {title, description}= req.body;
    try {
        const serviceDelete = await Service.findByIdAndDelete(id);
        if(!serviceDelete){
            return res.status(404).json({
                message:"service not found",
                data:serviceUpdate,
                success:false,
                statusCode: 404,
            })
        }
        return res.status(200).json({
            message:"service deleted successfully",
                data:serviceUpdate,
                success:true,
                statusCode: 200,
        });

    } catch (error) {
        errorHandler(error,res);
    }
}


module.exports ={
    createService,
    getServices,
    updateService,
    deleteService,
}
