import RendezVous from "../models/RendezVous.js";
import Parent from "../models/Parent.js";
import Child from "../models/Child.js";
import Kindergarten from "../models/Kindergarten.js";
import Notification from "../models/Notification.js";
import reservation_states from "../config/reservation_states.js";
import {addChild} from "./Kindergarten.js";
import roles from "../config/Roles.js";
import { addManualEvent } from "./Event.js";
import { createNotification } from "./Notification.js";
import notificationTypes from "../config/notificationTypes.js";


export const createRendezVous = async(req, res ) =>{
     const parent = req.user._id;
     const {objet, description, date} = req.body;
     const {kindergartenId} = req.params;
     try{
         if(!parent || !kindergartenId) throw new Error("absence of one of the params");
         let rv = await RendezVous.find({parent:parent, kindergarten:kindergartenId});
         if(rv.filter(rv=>rv.state==='En attente').length > 0) throw new Error("you already have an appointement");
         else {rv = await RendezVous.create({
            parent,
            kindergarten:kindergartenId,
            objet,
            description,
            date,
         });
         let p = await Parent.findByIdAndUpdate(parent, {$push:{rendezVous:rv._id}});
         let k = await Kindergarten.findByIdAndUpdate(kindergartenId, {$push:{rendezVous:rv._id}});
         await createNotification(k, p, notificationTypes.createrv, null);
         res.status(200).json({
            rv,
            message: "successufelly added a rendezvous",
         });
      }
      }
      catch(err){
      res.status(404).json({message: err.message});
      }
}


export const getRendezVousById = async(req, res)=>{
     const {rvId} = req.params;
     try{
      if(!rvId) throw new Error("absence of rendezvous id");
      const rv = await RendezVous.findById(rvId);
      if(!rv) throw new Error({message: "rendezvous not found"});
      res.status(200).json({
         message:"rendezvous found",
         rv,
      });
     }
   catch(err){
      res.status(404).json({
         message:err.message,
      });
   }

}


export const getAllRendezVous = async(req, res)=>{
   try{
      let rv = [];
      let rvs = [];
      let user = await Kindergarten.findById(req.user._id).populate("rendezVous");
        rv = user.rendezVous;
        for (const element of rv) {
            await element.populate("parent");
            const { firstName, lastName, profilePic, _id } = element.parent;
            delete element.parent;
            delete element.kindergarten;
            rvs.push({ element, firstName, lastName, profilePic, _id });
        }
        res.status(200).json({
            message:"getting all rendezvous is finished with success",
            rendezvous:rvs
        })
  }    
  catch(err){
      res.status(404).json({message: err.message});
  }

}


export const changeRendezVousStatus = async(req, res) =>{
   const {status} = req.body;
   const {rvId}=req.params
   try{
    let rv = await RendezVous.findByIdAndUpdate(rvId, {state: status});
    if(status === reservation_states.ACC) {
        let event = {
            persons: new Array(rv.parent),
            title:rv.objet ,
            description:rv.description,
            type:"rendezvous",
            start:rv.date,
            end:rv.date.setHours(rv.date.getHours() + 1),
        };
        addManualEvent(req,event);
    };
    let p = await Parent.findById(rv.parent);
    let k = await Kindergarten.findById(rv.kindergarten);
    await createNotification(k, p, notificationTypes.rvState, null);
     res.status(200).json({
      message:"update successful",
   }
     );
}
catch(err){
    res.status(404).json({ 
        message:err.message
    });
}
}