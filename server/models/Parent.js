import mongoose, { Schema } from "mongoose";
import gender from "../config/Gender.js";
import Notification from "../models/Notification.js";
import Chat from "../models/Chat.js";
import parent from "../config/Roles.js";
const ParentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
          },
          lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
          },
          phone:{
            type:String,
            required:true,
          },
          email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
          },
          password: {
            type: String,
            required: true,
            min: 5,
          },
          profilePic: {
            type: String,
            default: "",
          },
          children:[{ 
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Child'
          }],
          preinscriptions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Preinscription'
          }],
          civilite:{
            type:String,
            enum:["Mr", "Mme"],
            required:true,
          }, 

          chats:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat",
          }],
          notifications:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Notification",

          }],
          role:{
            type:String,
            default:"PARENT",
          },

          notificationMail:{
            type:Boolean,
            default:true,
          },
          notificationPush:{
            type:Boolean,
            default:true,
          },
          notificationSMS:{
            type:Boolean,
            default:true,
          },
          privateAcc:{
            type:Boolean,
            default:false,
          },
          location:{
            wilaya:{type:String, required:true},
            commune:{type:String, required:true},
            
          },
          lng:{type:Number, required:true},
          lat:{type:Number, required:true},
          phone:{
            type:String,
            required:true,
          },
          rendezVous: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RendezVous'
          }],     
    }

)

const Parent = mongoose.model("Parent", ParentSchema);
export default Parent;