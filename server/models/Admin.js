import mongoose, {Schema} from "mongoose";
import roles from "../config/Roles.js";
const adminSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
        min:2,
        max:50,
    },
    email:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String,
        min:2,
        max:50,
    },
    role:{
        type:String,
        enum: roles,
        required: true,
        default: roles.moderator,
    },
    profilePic: {
            type: String,
            default: "",
    },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;