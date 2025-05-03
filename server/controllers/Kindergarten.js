import express from "express";
import Kindergarten from "../models/Kindergarten.js";
import Child from "../models/Child.js";
import jwt from 'jsonwebtoken';
import bcrypt, { compareSync } from 'bcrypt';
import geolib from 'geolib';
import Preinscription from "../models/Preinscription.js";
import RendezVous from "../models/RendezVous.js";
import gender from "../config/Gender.js";
import reservation_states from "../config/reservation_states.js";



/*  REGISTER KINDERGARTEN  */

export const KindergartenRegister = async (req, res) => {
     try {
      const { 
        email,
        password,
        phone,
        location,
        lng,
        lat,
        etabName,
        pedagogie,
        startAge,
        endAge,
        capacite,
        startHour,
        endHour,
        days,
        typeAccueil,
        typeEtab,
        cout,
        languages,
        services,
        description

       } = req.body;
        // Check if a kindergarten with the same email already exists
        const existingKindergarten = await Kindergarten.findOne({ email });
        if (existingKindergarten) throw new Error("this email already exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedKindergarten = new Kindergarten({
      email,
      password:hashedPassword,
      phone,
      location,
      lng,
      lat,
      etabName,
      pedagogie,
      startAge,
      endAge,
      capacite,
      startHour,
      endHour,
      days,
      typeAccueil,
      typeEtab,
      cout,
      languages,
      services,
      description
      
      });
 
      let kinder = await Kindergarten.create(savedKindergarten);
      

      res.status(201).json({
        message:"kindergarten added with success",
        token: generatetoken(kinder._id, kinder.role),
        id:kinder._id,
        role:kinder.role,
      });
      } 
      catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const generatetoken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


export const KindergartenLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) throw new Error("absence of one of the params");
        const existingKindergarten = await Kindergarten.findOne({ email });
        if (!existingKindergarten) throw new Error("email does not exist");
        const passwordMatch = await bcrypt.compare(password, existingKindergarten.password);
        if (!passwordMatch) throw new Error("Wrong password");
        let token = generatetoken(existingKindergarten._id, existingKindergarten.role);
        delete existingKindergarten.password;
        res.status(200).json({
          token,
           existingKindergarten,
          message:"Login with success",
          id:existingKindergarten._id,
          role:existingKindergarten.role,
        });
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

export const updateProfile = async(req, res) =>{
  try{
      let result = await Kindergarten.findByIdAndUpdate(req.user._id,req.body,{new:true});
      if(!result) throw new Error("Parent not found");
      let msg = {
          message: "Kindergarten successfuly updated",
          result
         };
          res.status(200).json(msg);
  }
  catch(err){
      res.status(404).json({ message: err.message });
  }
}

/* GET Kindergarten BY ID */

export const getKindergartenById = async (req, res) => {
  const { kinderId } = req.params;
  try {
    if (!kinderId) throw new Error("absence of kindergarten id");
    let kindergarten = await Kindergarten.findById(kinderId).populate("reviews");
    let found = kindergarten.reviews.some(review => {
      return (review.from.toString() === req.user._id.toString())  
    });
    if (!kindergarten) throw new Error("Kindergarten not found");
    let kindergartenCoords = { latitude: kindergarten.lat, longitude: kindergarten.lng };
    let parentCoords = { latitude: req.user.lat, longitude: req.user.lng };
    let distance = geolib.getDistance(parentCoords, kindergartenCoords) / 1000;
    delete kindergarten.password;
    kindergarten.reviews.forEach(async(review)=> await review.populate("from"));
    let ic = await Preinscription.find({parent:req.user._id, kindergarten:kindergarten._id});
    let rv = await RendezVous.find({parent:req.user._id, kindergarten:kindergarten._id});
    let rendezVous = rv.map(e=>{return(
      {
        id:e.id,
        State:e.state
      }
    )})
    let inscription = ic.map(e=>{return(
      {
        id:e.id,
        State:e.State
      }
    )})
    res.status(200).json({
      message:"kindergarten found",
      kindergarten,
      distance,
      rendezVous,
      inscription,
      found,
    });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/* Get All Kindergarten */

export const getAllKindergarten = async (req, res) => {
  try {
      const kindergartens = await Kindergarten.find();
      if (kindergartens.length === 0) res.status(200).json({
        message: "There are no kindergartens",
      }) ;
      else res.status(200).json({ kindergartens }); 
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

/* DELETE KINDERGARTEN */

export const DeleteKindergarten = async (req, res) => {
    const { id } = req.params;
    try {
      if(!id) throw new Error("absence of id");
      const deletedKindergarten = await Kindergarten.findByIdAndDelete(id);
      res.status(200).json({ message: 'Kindergarten has been deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* UPDATE KINDERGARDEN INFORMATIONS */

export const UpdateKindergarten = async (req, res) => {
    const kindergartenId = req.params.id;
    const updates = req.body;
    try {
        const updatedKindergarten = await Kindergarten.findByIdAndUpdate(
          kindergartenId,
          updates,
          { new: true }
        );
        if (!updatedKindergarten) {
        return res.status(404).json({ message: 'Kindergarten not found' });
        }
        res.status(200).json({ kindergarten: updatedKindergarten });
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
};

/* Get all kindergartens within a certain distance from the parent */

export const getKindergartensWithinDistance = async (req, res) => {
  const { longitude, latitude } = req.body;
  const distance = 500;
  
  try {
    // Get the kindergartens from the database
    const kindergartens = await Kindergarten.find();   
    // Filter kindergartens within the desired distance
    const filteredKindergartens = kindergartens.filter((kindergarten) => {
      const kindergartenCoords = { latitude: kindergarten.latitude, longitude: kindergarten.longitude };
      const parentCoords = { latitude: latitude, longitude: longitude };
      const distanceInMeters = geolib.getDistance(parentCoords, kindergartenCoords);
      const distanceInKilometers = distanceInMeters ;
      return distanceInKilometers <= distance;
    });
    
    res.json(filteredKindergartens);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/* Get all kindergartens of a certain wilaya */

export const getKindergartenByWilayaANDCommune = async (req, res) => {
  try {
    const { wilaya} = req.user.location;
    const wantedKindergartens = await Kindergarten.find({ "location.wilaya" : wilaya});
      if (wantedKindergartens.length === 0) res.status(200).json({
        message: "There are no kindergartens found ",
      });
      else res.status(200).json({
        message:"getting user wilayas kindergartens done with success",
        kindergartens: wantedKindergartens
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


/* Get A Child By Kindergarten */

export const getAllChildren = async (req, res) => {
  const {KindergartenId} = req.params;  
  try {
    const kinder = await Kindergarten.findById({KindergartenId}).populate("children");
    let children = kinder.children;
    if(children.length === 0) res.status(200).json({
      message:"there are no children",
    })
    else res.status(200).json({
       children,
       message:"found children",
    });
} catch (err) {
    res.status(500).json({ error: err.message });
}
}

/* Add a Child To The Kindergarten */

export const addChild = async (kindergartenId, childId) => {
    const kindergarten = await Kindergarten.findById(kindergartenId);
    if (!kindergarten) throw new Error("kindergarten not found");

    const child = await Child.findById(childId);
    if (!child) throw new Error("child not found");
    kindergarten.children.push(child);
    await kindergarten.save();
};

export const getMyKindergarten = async (req, res) => {
  try {
    if (!req.user._id) throw new Error("absence of kindergarten id");
    const kindergarten = await Kindergarten.findById(req.user._id).populate("reviews");
    delete kindergarten.password;
    for (const review of kindergarten.reviews) {
      await review.populate("from")
    }
      console.log(kindergarten)
    if (!kindergarten) throw new Error("Kindergarten not found");
    res.status(200).json({ kindergarten });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getStatisticsByPeriod = async(req, res)=>{
  try{
    const today = new Date();
    let elem;
    let newMale;
    let newFemale;
    let label;
    let data  = [];
    let insc;
    let filteredincs;
    const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const {period} = req.body;
    let date;
    if (period === "y") {
      date = new Date(today.getFullYear() - 1, 0, 1);
      insc = await Preinscription.find({kindergarten: req.user._id, State: reservation_states.ACC}).populate("child");
      filteredincs = insc.filter(ins => (new Date(ins.created_at)) > date);
      console.log(filteredincs);
      for(let i = 0; i <= today.getMonth(); i++){
        newMale = filteredincs.filter(ins => ((ins.child.gender === gender.male) && (ins.created_at.getMonth() === i))).length;
        newFemale = filteredincs.filter((ins) => ((ins.child.gender === gender.female) && (ins.created_at.getMonth() === i))).length;
        label = monthNames[i];
        data.push({newMale, newFemale, label});
      }
    }
    else if (period === "m") {
      date = new Date(today.getFullYear(), today.getMonth(), 1);
      insc = await Preinscription.find({kindergarten: req.user._id, State: reservation_states.ACC}).populate("child");
      filteredincs = insc.filter(ins => (new Date(ins.created_at)) > date);
      for(let i = 0; i <= parseInt(today.getDate() / 7); i++){
        newMale = filteredincs.filter(ins => ((ins.child.gender === gender.male) && ((parseInt(ins.created_at.getDate() / 7) === i)))).length;
        newFemale = filteredincs.filter(ins => ((ins.child.gender === gender.female) && (parseInt(ins.created_at.getDate() / 7)=== i))).length;
        label = 'Semaine '+ (i + 1)
        data.push({newMale, newFemale, label});
      }
    }
     else if (period === "w") {
      date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
      insc = await Preinscription.find({kindergarten: req.user._id, State: reservation_states.ACC}).where("created_at").populate("child");
      filteredincs = insc.filter(ins => (new Date(ins.created_at)) >= date);
      console.log(insc);
      for(let i = 0; i < 7; i++){
        newMale = filteredincs.filter(ins => ((ins.child.gender === gender.male) && (ins.created_at.getDay() === i))).length;
        newFemale = filteredincs.filter(ins => ((ins.child.gender === gender.female) && (ins.created_at.getDay() === i))).length;
        label = dayNames[i];
        data.push({newMale, newFemale, label});
      }
    }
    if(data.length === 0 ) res.status(200).json("user doesn't have any stats");
    else res.status(200).json(data);
  }
catch(err){
res.status(404).json({
  message:err.message
});
}
}


export const getNumbersNParents = async(req, res) => {
try{
  let parents=[];
  let uniqueArray = [];
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const current_month = (await Preinscription.find({kindergarten: req.user._id, State: reservation_states.ACC}).where("created_at").gt(date)).length;
    console.log(current_month);
  const all_insc = (await Preinscription.find({kindergarten: req.user._id, State: reservation_states.ACC})).length;
    const kinder = await Kindergarten.findById(req.user._id).populate("children");
    const children = kinder.children;
    if(children.length === 0) parents = [];
    else{
      for (let child of children) {
        await child.populate("parent"); 
        let { firstName, lastName, profilePic, _id } = child.parent;
        parents.push({ firstName, lastName, profilePic, _id });
      };
      uniqueArray = parents.filter((parent, index) => {
             const _value = JSON.stringify(parent);
             return index === parents.findIndex(obj => {
             return JSON.stringify(obj) === _value;
            });
            });
  }
    res.status(200).json({
      parents:uniqueArray,
      current_month,
      all_insc,
    });
}
catch(err){
  res.status(500).json({
    message:err.message,
  });
}
}

/* Update the Kindergarten's Rating */






