import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import roles from "../config/Roles.js";
import Parent from "../models/Parent.js";
import Kindergarten from "../models/Kindergarten.js";
import Child from "../models/Child.js";
import Preinscription from "../models/Preinscription.js";
import gender from "../config/Gender.js";

/*REGISTER PARENT  */


export const AdminRegister = async (req, res) => {
try {
    const {
      username,
      email,
      password,
      role,
      profilePic
    } = req.body;
    const count = await Admin.countDocuments({email: email});
    if (count > 0) throw new Error("email already exists");
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const savedAdmin = {
       username: username,
       email: email,
       password: passwordHash,
       role: role,
       profilePic
    };
    let admin = await Admin.create(savedAdmin);
    delete admin.password;
    let msg = {
        message: "Admin created successfully",
        admin,
        token: generateToken(admin._id, admin.role),
        role:admin.role
    };
    (res.status(201).json(msg));
}
catch (err) {
    res.status(500).json({ error: err.message });
  }

}



/*   LOGIN PARENT    */

export const AdminLogin = async (req, res) => {
    const {email, password} = req.body;
   
    try {
       if (!email || !password) throw new Error("email or password not present")
        const admin = await Admin.find({email: email});
        if(admin.length === 0)throw new Error("didnt find admin")
        
            const isFound = await bcrypt.compare(password, admin[0].password);
            if(!isFound)throw new Error("invalid credentials");
            delete admin.password;
            let msg = {
                message: "Log in successful",
                admin,
                role:admin[0].role,
                token: generateToken(admin[0]._id, admin[0].role),
            }
            res.status(200).json(msg);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}



/*        Adding function to generate tokens for our users     */

const generateToken = (id, role) => {
  return jwt.sign({ id, role}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
};




/*         Getting all admins                */


export const getAllAdmins = async (req, res) => {
     try{
           let admins = await Admin.find();
           res.status(200).json(admins);
     }
     catch(err){
        res.status(404).json({message: err.message});
     }
}



export const getAdminsByRole = async (req, res) =>{
    try{
        let role = req.role;
        if(!role) throw new Error("there is no role specified");
        let admins = await Admin.find({role: role});
        res.status(200).json(admins);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}



export const changeAdminRole = async (req, res) =>{
  try{
    let {role} = req.body;
    let {id} = req.params;
    if(!id || !role) throw new Error("absence of role or id");
    if(req.role === roles.moderator) throw new Error("You don't have the privileges to complete this action");
   // if (role === roles.admin) throw new Error("Cannot change the role of an admin");
    await Admin.findByIdAndUpdate(id, {$set: {role: role}});
    res.status(200).json("role updated successfully");
  }
  catch(err){
    res.status(404).json({message: err.message});
  }
}



export const getAdminById = async(req, res)=>{
  const {id} = req.params;
    try{
        if(!id) throw new Error("id not present");
        let result = await Admin.findById(id);
        if(!result) throw new Error("Parent not found")
        let msg = {
            message: "Admin found with success",
            result
            };
        res.status(200).json(msg);
    }
    catch(err){
          res.status(404).json({ message: err.message });
    }
}


export const deleteAccount = async(req, res) =>{
  try{
      let result = await Admin.findByIdAndDelete(req.user._id);
      if(!result) throw new Error("Parent not found");
      let msg = {
          message: "account successfuly deleted",
          result
         };
          res.status(200).json(msg);
  }
  catch(err){
      res.status(404).json({ message: err.message });
  }
}




export const deleteAdmin = async (req, res) => {

  const {id} = req.params;
  try{
     if(!id) throw new Error("admin id not presented")
      if(req.role === roles.moderator) throw new Error("You don't have the privileges to complete this action");
      let user = await Admin.findById(id);
      if(user.role === roles.admin) throw new Error("You cannot complete this action");
      await Admin.findByIdAndDelete(id);
      res.status(200).json({
        message:"successfully deleted the user",
      })
  }
  catch(err){
      res.status(404).json({ message: err.message });
  }

}



export const adminDashboard = async(req, res) => {
  let parentNumber = await Parent.count();
  let kindergartenNumber = await Kindergarten.count();
  let childrenNumber = await Child.count();
  res.status(200).json({
    parentNumber,
    kindergartenNumber,
    childrenNumber
  })

}


export const adminStats = async(req, res) =>{
    const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    const today = new Date();
    let {period} = req.body;
    let elem;
    let newMale;
    let newFemale;
    let label;
    let data  = [];
    const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    let insc;
    let filteredincs;
    let date;
    if(period === "y"){
      date = new Date(today.getFullYear() - 1, 0, 1);
      insc = await Preinscription.find().populate("child");
      filteredincs = insc.filter(ins => (new Date(ins.created_at)) > date);
      for(let i = 0; i <= today.getMonth(); i++){
        newMale = filteredincs.filter(ins => ((ins.child.gender === gender.male) && (ins.created_at.getMonth() === i))).length;
        newFemale = filteredincs.filter((ins) => ((ins.child.gender === gender.female) && (ins.created_at.getMonth() === i))).length;
        label = monthNames[i];
        data.push({newMale, newFemale, label});
      }
    }
      else if (period === "m") {
      date = new Date(today.getFullYear(), today.getMonth(), 1);
      insc = await Preinscription.find().populate("child");
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
      insc = await Preinscription.find().where("created_at").populate("child");
      filteredincs = insc.filter(ins => (new Date(ins.created_at)) >= date);
      console.log(insc);
      for(let i = 0; i < 7; i++){
        newMale = filteredincs.filter(ins => ((ins.child.gender === gender.male) && (ins.created_at.getDay() === i))).length;
        newFemale = filteredincs.filter(ins => ((ins.child.gender === gender.female) && (ins.created_at.getDay() === i))).length;
        label = dayNames[i];
        data.push({newMale, newFemale, label});
      }
    }
    res.status(200).json(data);

}