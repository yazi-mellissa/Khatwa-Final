import mongoose from 'mongoose';
const { Schema } = mongoose;
import reservation_states from "../config/reservation_states.js";


const RendezVousSchema = new Schema({
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
  },
  kindergarten: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kindergarten',
  },
  state: { 
    type: String,
    enum: reservation_states,
    required: true, 
    default: reservation_states.PEN},
  date : {
    type: Date,
    required:true,
  },
  objet:{
    type: String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
});

const RendezVous = mongoose.model('RendezVous', RendezVousSchema);
export default RendezVous;