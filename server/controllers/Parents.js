import Parent from "../models/Parent.js";
import Child from "../models/Child.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import Kindergarten from "../models/Kindergarten.js";
import Preinscription from "../models/Preinscription.js";
import geolib from "geolib";


/*     Deleting a parent     */

export const deleteAccount = async(req, res) =>{
    try{
        let result = await Parent.findByIdAndDelete(req.user._id);
        if(!result) throw new Error("Parent not found");
        let msg = {
            message: "Parent successfuly deleted",
            result
           };
            res.status(200).json(msg);
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }
}

export const updateAccount = async(req, res) =>{
    try{
        let result = await Parent.findByIdAndUpdate(req.user._id,req.body.account,{new:true});
        if(!result) throw new Error("Parent not found");
        let msg = {
            message: "Parent successfuly updated",
            result
           };
            res.status(200).json(msg);
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }
}




export const deleteParent = async (req, res) => {

    const {id} = req.params;
    try{
        if(!id) throw new Error("id not presented")
        let result = await Parent.findByIdAndDelete(id);
        if(!result) throw new Error("Parent not found");
        let msg = {
            message: "Parent successfuly deleted",
            result
           };
            res.status(200).json(msg);
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }

}


/*    Getting a parent by id     */


export const getParentById = async (req, res) => {
    const {id} = req.params;
    try{
        if(!id) throw new Error("id not present");
        let result = await Parent.findById(id).populate("children");
        if(!result) throw new Error("Parent not found")
        let msg = {
            message: "parent found with success",
            parent:result
            };
        res.status(200).json(msg);
    }
    catch(err){
          res.status(404).json({ message: err.message });
    }

}

export const getProfile = async (req, res) => {
    try{
        let id = req.user._id;
        let result = await Parent.findById(id).populate("children");
        if(!result) throw new Error("Parent not found");
        let msg = {
            message: "parent found with success",
            parent:result
            };
        res.status(200).json(msg);
    }
    catch(err){
          res.status(404).json({ message: err.message });
    }

}




/*    Getting a parent by name    */


export const getParentByName = async (req, res) => {
    const {firstName, lastName} = req.body;
    try{
        if(!firstName || !lastName) throw new Error("first or last name not presented")
        else{
            let result = await Parent.find({firstName: firstName, lastName: lastName});
            if(!result) throw new Error("Parent not found")
            else{
                let msg = {
                    message: "Parent found with success",
                    result
                };
            
                res.status(200).json(msg)
            }
        }
    }
    catch(err){
          res.status(404).json({ message: err.message });
    }

}



/*    Update a parent infos     */


export const updateParentPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    try{
        parent = await Parent.findById(req.user._id);
        if(!oldPassword || !newPassword) throw new Error("one of the params not presented")

        const isFound = await bcrypt.compare(oldPassword, parent.password);
        if(!isFound){
            res.status(401).json({
            message: "Wrong password",
            });
            }
        else{
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(newPassword, salt);
            await Parent.updateOne({_id: req.user._id}, {$set: {password: passwordHash}});
            res.status(202).json({
                message: "password saved correctly",
            });
        }
    }
    catch(err){
        res.status(404).json({message: err.message});
    }

}


/*             Adding a child to a parent       */



export const addChild = async (req, res) => {
    let {children} = req.body;
    try{
        let childrenIds=[];
        if (children.length === 0) res.status(200).json({
            message:"parent did not add any children"
        }) ;
        else{
            children = children.map(child=>({...child, parent : req.user._id}));
            console.log(children)
            for(let child of children){
                let kid = await Child.create(child);
                childrenIds.push(kid._id);
            }
            await Parent.updateOne({_id: req.user._id}, {$push: {children: {$each:childrenIds}}});
            let msg = {
                message: "Child added correctly",
                children
            };
            res.status(201).json(msg);
        }
    }
    catch(err){
        res.status(404).json({message: err.message});
    }

}




/*      deleting a child from parent children array     */


export const deleteChild = async (req, res) => {
    const {childId} = req.body;
    try{
        if (!childId) throw new Error("one of the params is not present");
        let child = await Child.findById(childId);
        if(child.parent === req.user._id) {
            await Child.findByIdAndDelete(childId);
            await Parent.updateOne({_id: req.user._id}, {$pull: {children: childId}});
            res.status(200).json({message: `Child with id ${childId} removed successfuly`});
        }
        else throw new Error("you don't have the permission to delete another parent kid");
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}


/*       Getting a child by id      */

export const getChildById = async (req, res) => {
    const {childId} = req.body;
    try{
        if (!childId) throw new Error("one of the params is not present");
        const child = await Child.findById(childId);
        if(req.user._id === child.parent){
            let mes = {
                message: `Child with id ${childId} found`,
                child,
            };
            res.status(200).json(mes);
        }
        else throw new Error("you dont have the permissions");
    }
    catch(err){
        res.status(404).json({message: err.message});
    }

}



/*           Getting all the children          */

export const getAllChildren = async (req, res) => {
    try{
        const parent = await Parent.findById(req.user._id).populate("children");
        const children = parent.children;
        if(children.length === 0) res.status(200).json({message: "Parent doesnt have any children"});
        else{ 
           res.status(200).json({
            message:"children found successfully",
            children});
        }
    }    
    catch(err){
        res.status(404).json({message: err.message});
    }

}



/*                GETTING ALL PARENTS                 */


export const getAllParents = async (req, res) => {
     try{
           let users = await Parent.find();
           res.status(200).json(users);
     }
     catch(err){
        res.status(404).json({message: err.message});
     }
}





export const getAllSubscribedKindergartens = async(req, res) =>{
    try{
        let { wilaya} = req.user.location;
        let wilayaKindergartens;
        let wantedKindergartens = await Kindergarten.find({ "location.wilaya" : wilaya});
        if (wantedKindergartens.length === 0) wilayaKindergartens = [];
        else{
            wilayaKindergartens = wantedKindergartens.map(kinder => {
                let{etabName,profilePic,startHour,endHour,lng,lat,_id } = kinder;
                 let wilaya = kinder.location.wilaya;
                 let commune = kinder.location.commune;
                 let kindergartenCoords = { latitude: lat, longitude: lng };
                 let days = kinder.days;
                 let parentCoords = { latitude: req.user.lat, longitude: req.user.lng};
                 let distance = geolib.getDistance(parentCoords, kindergartenCoords) / 1000;
                 return({etabName, profilePic,startHour, endHour, distance,wilaya, commune, days, _id});
                 }
             );
        }
        let incs = await Preinscription.find({"parent": req.user._id}).populate("kindergarten");
        if (incs.length === 0) res.status(200).json({
            message:"operation done with success",
            wilaya: req.user.location.wilaya,
            wilayaskindergartens:wilayaKindergartens,
            subscribedKindergartens:[],   
        });
        else{
            let kinders = incs.map(ins => {
                let {State}=ins
                let{etabName,profilePic,startHour,endHour,lng,lat,_id } = ins.kindergarten;
                let wilaya = ins.kindergarten.location.wilaya;
                let commune = ins.kindergarten.location.commune;
                let kindergartenCoords = { latitude: lat, longitude:lng };
                let workDays = ins.kindergarten.days;
                let parentCoords = { latitude: req.user.lat, longitude: req.user.lng };
                let distance = geolib.getDistance(parentCoords, kindergartenCoords) / 1000;
                return({etabName, profilePic,startHour, endHour, distance, commune, workDays, _id,State});
                }
            );
           
            res.status(200).json({
                message:"getting subscribed kindergartens done with success",
                wilaya: req.user.location.wilaya,
                subscribedkindergartens:kinders,
                wilayaskindergartens:wilayaKindergartens,
            });
    }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
