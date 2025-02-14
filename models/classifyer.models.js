import mongoose from "mongoose";

const ClassifyerSchema = new mongoose.Schema({
    source_type:{
        type:String,
        enum:['vehicle','electricity','supplier',],
        required: true
    },
    ownership:{
        type:String,
        enum:['owned','purchased','third-party'],
        required: true
    },
    activity_type:{
        type:String,
        enum:['fuel-combustion','power-usage','purchased-goods'],
        required: true
    },
    energy_consumption:{
        type:Number,
        required: true
    },
    fuel_type:{
        type:String,
        enum:['grid','n/a','diesel','petrol'],
        required: true
    },
    transport_distance:{
        type:Number,
        required:true
    },
    emission_factor:{
        type:Number,
        required:true
    },
    emission_scope:{
        type:String,
        enum:['scope1','scope2','scope3'],
        required: true
    },
    company_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
        default: Date.now,
      },
})

const Classifyer = mongoose.model('Classifyer',ClassifyerSchema)
export default Classifyer 