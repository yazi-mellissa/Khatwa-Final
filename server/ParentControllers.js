import Parent from "../User/Parent";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*REGISTER PARENT  */


export const parentRegister = async (req, res) => {
try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      birth_date,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const savedParent = {
       firstName,
       lastName,
       email,
       password: passwordHash,
       picturePath,
       birth_date,
    };
    await Parent.create(savedUser)
    .then(res.status(201).json(savedParent));
}
catch (err) {
    res.status(500).json({ error: err.message });
  }

}



/*   LOGIN PARENT    */

export const parentLogin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
    return res.status(400).json({
      message: "email or Password not present",
    })
  }
    try {
        const parent = await Parent.findOne({email});
        if(!parent){
            res.status(400).json({
                message: "Login not successful",
                error: "Email does not correspond to any account",
            })
        }
        else{
            const isFound = bcrypt.compare(password, parent.password);
            if(!isFound) return res.status(400).json({
                message: "Login not successful",
                error: "Invalid credentials.",
            })
            const token = jwt.sign({id : parent._id}, process.env.JWT_SECRET);
            delete parent.password;
            res.status(200).json({token, parent});
        }
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}
