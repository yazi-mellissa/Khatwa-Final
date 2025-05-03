import mongoose from "mongoose";
import Notification from "./Notification.js";
import Preinscription from "./Preinscription.js";
const { Schema } = mongoose;
import days from "../config/days.js";
import educational_plans from "../config/EducationalPlans.js";
import reservation_states from "../config/reservation_states.js";
import types_accueil from "../config/types_accueil.js";
import types_etablissement from "../config/types_etablissement.js";
import types_service from "../config/types_service.js";
import roles from "../config/Roles.js";

const KindergartenSchema = new Schema({
    email: {
        type: String,
        required: true 
    },
    password: { 
        type: String,
        required: true 
    },
    phone: {
        type: String,
        required: true 
    },
    location: { 
        wilaya:{type:String, required:true},
        commune:{type:String, required:true},
    },
    lng : { type: Number, required: true },
    lat : { type: Number, required: true },
    etabName: {
        type: String,
        required: true
    },
    pedagogie: [{
        type: String,
        enum: educational_plans,
        required: true
    }],
    startAge: {
         type:Number,
    },
    endAge: {
         type: Number,
    },
    capacite: {
        type:Number,
        required:true,
    },
    reviews:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Review",
    }],
    images: [{ 
        type: String 
    }],
    profilePic:{
        type:String,
    },
    startHour: {
      type: String,
      required: true
    },
    endHour: {
       type: String,
       required: true
    }
    ,
    days:[{
        type:String,
        required:true,
        enum:days,
    }],
    children: [{
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Child' 
    }],
    preinscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Preinscription', 
    }],
    rendezVous:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RendezVous",
    }],
    notifications :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification' 
    }],
    chats : [{ 
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    events: [{
        type: Schema.Types.ObjectId,
        ref: "Event"
    }],
    typeAccueil:{
        type:String,
        enum:types_accueil,
        required:true,
    },
    typeEtab:{
        type:String,
        enum:types_etablissement,
        required:true,
    },
    cout:{
        type:Number,
        required:true,
    },
    languages:[{
        type:String,
        required:true,
    }],
    services:[{
        type:String,
        enum:types_service,
    }],
    description:{
        type:String,
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
    available:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:roles.kindergarten,
    },
    rating:{
        type:Number,
        default:0,
    }
});

const Kindergarten = mongoose.model('Kindergarten', KindergartenSchema);
export default Kindergarten;