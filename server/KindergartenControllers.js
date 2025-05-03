const express = require('express');
//const Kindergarten = require('../Models/kindergarten');
const User = require('../Models');
const KindergartenUser = require('../Models').model('KindergartenUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/*  REGISTER KINDERGARTEN  */

exports.KindergartenRegister = async (req, res) => {
    const { 
        kindergartenName, 
        email, 
        password, 
        Education, 
        minAge, 
        maxAge, 
        classCapacity, 
        location,
        schedule,
     } = req.body;
     try {
        // Check if a kindergarten with the same email already exists
        const existingKindergarten = await KindergartenUser.findOne({ email });
        if (existingKindergarten) {
          return res.status(400).json({ msg: 'This email already exists' });
        }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedKindergarten = new KindergartenUser({
        _id: new mongoose.Types.ObjectId(),
        kindergartenName,
        email,
        password: hashedPassword,
        Education,
        minAge,
        maxAge,
        classCapacity,
        location,
        schedule
      });
      await savedKindergarten.save();
      } 
      catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const KindergartenLogin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
    return res.status(400).json({
      message: "email or Password not present",
    })
  }
    try {

        const existingKindergarten = await KindergartenUser.findOne({ email });
        if (!existingKindergarten) {
          return res.status(400).json({ 
            message: "Login not successful",
            error: "Email does not correspond to any account",
            });
        }

        const passwordMatch = await bcrypt.compare(password, existingKindergarten.password);
        if (!passwordMatch) {
        return res.status(400).json({  
            message: "Login not successful",
            error: "Invalid credentials.", 
        });
        }

        const token = jwt.sign({ id: existingKindergarten._id }, process.env.JWT_SECRET);
        res.status(200).json({token, existingKindergarten});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

/* GET Kindergarten BY ID */

exports.getKindergartenById = async (req, res) => {
  const { id } = req.params;
  try {
    const kindergarten = await KindergartenUser.findById(id);
    if (!kindergarten) {
      return res.status(404).json({ message: 'Kindergarten not found' });
    }
    res.status(200).json({ kindergarten });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE KINDERGARTEN */

exports.DeleteKindergarten = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedKindergarten = await KindergartenUser.findByIdAndDelete(id);
        if (!deletedKindergarten) {
            return res.status(404).json({ message: 'Kindergarten not found' });
          }
          return res.status(200).json({ message: 'Kindergarten has been deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* UPDATE KINDERGARDEN INFORMATIONS */

exports.UpdateKindergarten = async (req, res) => {
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


