import mongoose from 'mongoose';
const { Schema } = mongoose;
import reservation_states from "../config/reservation_states.js";
import Services from "../config/types_service.js";


const PreinscriptionSchema = new Schema({
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
  },
  kindergarten: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kindergarten',
  },
  child:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Child",
  },
  State: { 
    type: String,
    enum: reservation_states,
    required: true, 
    default: "En attente",
},
  services:[{
    type:String,
    enum:Services,
  }],
  
  cout:{
    type:Number,
    required:true
  },
  created_at:{
    type:Date,
    default:new Date()
  }
});

const Preinscription = mongoose.model('Preinscription', PreinscriptionSchema);
export default Preinscription;