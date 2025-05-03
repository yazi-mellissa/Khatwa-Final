import mongoose, { Schema } from "mongoose";
import Parent from "./Parent.js";
import Kindergarten from "./Kindergarten.js";
import gender from "../config/Gender.js";
import educational_plans from "../config/EducationalPlans.js";


const ChildSchema = new mongoose.Schema(
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
          birthDate: {
            type: Date,
            required: true,
          },
          parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Parent,
          },
          kindergarten: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Kindergarten,
          }],
          gender: {
            type: String,
            enum: gender,
            required: true,
          }
    }

)

const Child = mongoose.model("Child", ChildSchema);
export default Child;