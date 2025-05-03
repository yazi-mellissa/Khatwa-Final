import Parent from "../models/Parent.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*REGISTER PARENT  */


export const parentRegister = async (req, res) => {
try {
    const {
        civilite,
        email,
        password,
        phone,
        location,
        lng,
        lat,
        firstName,
        lastName,
        profilePic
    } = req.body;
    const count = await Parent.countDocuments({email: email});
    if (count > 0) {
        res.status(409).json({
           message: "Email already exists", 
        });
    }    
    else{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedParent = Parent({
        civilite,
        email,
        password:hashedPassword,
        phone,
        location,
        lng,
        lat,
        firstName,
        lastName,
        profilePic
    });
    let parent = await Parent.create(savedParent);
    delete parent.password;
    delete parent.firstName;
    delete parent.email;
    delete parent.lastName
    delete parent.picturePath;
    delete parent.birth_date;
    delete parent.children;
    delete parent.reservations;
    delete parent.chats;
    let msg = {
        message: "parent created successfully",
        token: generateToken(parent._id, parent.role),
        id:parent._id,
        role:parent.role,
    };
    (res.status(201).json(msg));}
}
catch (err) {
    res.status(500).json({ error: err.message });
  }

}



/*   LOGIN PARENT    */

export const parentLogin = async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    try {
        if(!email || !password) throw new Error("absence of email and password");
        const parent = await Parent.findOne({email: email});
        if(!parent){
            res.status(400).json({
                message: "wrong email",
            })
        }
        else{
            const isFound = await bcrypt.compare(password, parent.password);
            if(!isFound) throw new Error("wrong password");
            delete parent.password;
            let msg = {
                message: "Log in successful",
                token: generateToken(parent._id, parent.role),
                id:parent._id,
                role:parent.role,
            }
            res.status(200).json(msg);
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}



/*        Adding function to generate tokens for our users     */

const generateToken = (id, role) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

