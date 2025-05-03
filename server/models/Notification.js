import mongoose from "mongoose";
const { Schema } = mongoose;
import Kindergarten from "./Kindergarten.js";
import Parent from "./Parent.js";
import notificationTypes from "../config/notificationTypes.js";

const NotificationSchema = new Schema({
    kindergarten: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kindergarten',
      },
    parent: [{
        type: mongoose.Schema.Types.ObjectId,
       ref: 'Parent',
    }],
    type: {
      type: String,
      required: true,
      enum: notificationTypes
    },
    is_read : {type : Boolean, required: true, default: false},
    created_at:{
      type:Date,
      default:new Date(),
    },
    message:{
      type:String,
      require:true
    },
    time_since_created: {type:String} // or any other appropriate data type

});

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;



/*create preinsc rv
  create event publique
  change state rv/insc
  comm  */

