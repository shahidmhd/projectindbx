import mongoose from 'mongoose';

const Servicechema=new mongoose.Schema({
    servicename: {
        type: String,
        required: true,
        trim: true
    },
    HSNCode: {
        type: String,
        required: true,
        trim: true
    },
    GST: {
        type:Number,
        required: true,
        trim: true
    },
    SGST: {
        type:Number,
        required: true,
        trim: true
    },
    CGST: {
        type:Number,
        required: true,
        trim: true
    },
   Rate: {
        type:Number,
        required: true
    },
    UOM: {
        type:String,
        required: true
    }
},{
    timestamps:true
})


const service=mongoose.model('Service',Servicechema)
export default service;