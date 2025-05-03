import Preinscription from "../models/Preinscription.js";
import Parent from "../models/Parent.js";
import Child from "../models/Child.js";
import Kindergarten from "../models/Kindergarten.js";
import Notification from "../models/Notification.js";
import reservation_states from "../config/reservation_states.js";
import {addChild} from "./Kindergarten.js";
import roles from "../config/Roles.js";
import {createNotification} from "./Notification.js";
import notificationTypes from "../config/notificationTypes.js";

export const createPreInscription = async(req, res ) =>{
     const parent = req.user._id;
     const {childId, services, kindergarten, cout} = req.body;
     try{
         if(!parent || !kindergarten || !childId) throw new Error("absence of one of the params");
         let insc = await Preinscription.find({parent:parent, child:childId});
         if(insc.length > 0) throw new Error("you can't register this child");
         else {insc = await Preinscription.create({
             parent: parent,
             kindergarten:kindergarten,
             child:childId,
             services: services,
             cout:cout,
         });
         let p  = await Parent.findByIdAndUpdate(parent, {$push:{preinscriptions:insc._id}});
         let k = await Kindergarten.findByIdAndUpdate(kindergarten, {$push:{preinscriptions:insc._id}});
         await createNotification(k, p, notificationTypes.createinsc, null);
         res.status(200).json({
            insc,
            message: "successufelly added a preinscription",
         });
      }
      }
      catch(err){
      res.status(404).json({message: err.message});
      }
}


export const getPreInscriptionById = async(req, res)=>{
     const {inscId} = req.params;
     try{
      if(!inscId) throw new Error("absence of inscription id");
      const insc = await Preinscription.findById(inscId).populate("child");
      if(!insc) res.status(404).json({message: "Preinscription not found"});
      else res.status(200).json({
         message:"inscription found",
         insc,
      });
     }
   catch(err){
      res.status(404).json({
         message:err.message,
      });
   }

}


export const getAllPreInscriptions = async(req, res)=>{
   try{
      let user;
      let insc = [];
      let inscs = [];
      if (req.role === roles.parent){
            user = await Parent.findById(req.user._id).populate("preinscriptions");
            insc = user.preinscriptions;
            inscs = insc.map(async(element) => {
               element.populate("kindergarten");
               let {etabName, profilePic, _id} = element.kindergarten;
               delete element.parent;
               delete element.kindergarten;
               delete element.services;
               delete element.child;
               return({element, etabName, profilePic, _id});
            });
            if(inscs.length === 0 ) res.status(200).json("user doesn't have any preinscriptions");
            else res.status(200).json(inscs);
         }
      else {
         user = await Kindergarten.findById(req.user._id).populate("preinscriptions");
         insc = user.preinscriptions;
         console.log(insc);
         const inscs = [];
         for (const element of insc) {
            await element.populate("parent");
            const { firstName, lastName, profilePic, _id } = element.parent;
            delete element.parent;
            delete element.services;
            delete element.child;
            inscs.push({ element, firstName, lastName, profilePic, _id });
         }
         if(inscs.length === 0 ) res.status(200).json({
            message:"user doesn't have any preinscriptions",
            inscriptions:inscs
         });
         else res.status(200).json({
            message:"getting all preinscriptions is finished with success",
            inscriptions:inscs
         })
      }
  }    
  catch(err){
      res.status(404).json({message: err.message});
  }

}


export const changePreInscriptionStatus = async(req, res) =>{
   const {status} = req.body;
   const {inscId}=req.params
   try{
    let insc = await Preinscription.findById(inscId).populate("child");
    insc.State = status;
    let child = insc.child;
    insc.save();
    if(status === reservation_states.ACC) { addChild(insc.kindergarten, insc.child)};
    
    if(status === reservation_states.CANC) {
      await Kindergarten.findByIdAndUpdate(inscId, {$pull:{children: child._id}})
      await Child.findByIdAndUpdate(inscId, {$unset: {kindergarten:""}});
    }
    let p = await Parent.findById(insc.parent);
    let k = await Kindergarten.findById(insc.kindergarten);
    await createNotification(k, p, notificationTypes.inscState, null);
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
