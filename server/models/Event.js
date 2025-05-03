import mongoose from "mongoose";
const { Schema } = mongoose;


const EventSchema = new Schema({
    persons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
      }],
    kindergarten: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kindergarten',
      },
    title : {
      type : String,
      required: true
    },
    start : {type: Date,
      required: true
    },
    end:{
      type:Date,
      required:true,
    },
    seen : {type : Boolean,
      default:false,
    },
    type:{
      type:String,
      enum:["privé", "public", "rendezvous"],
      default:true,
    },
    description:{
      type:String,
    },

  
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
