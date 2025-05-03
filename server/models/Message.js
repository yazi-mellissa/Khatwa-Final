import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
    {
       from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        enum:['Parent','Kindergarten'],
       },
       to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        enum:['Parent','Kindergarten'],
       },       
       content:{
        type:String,
        required: true,
       },
       is_read:{
        type:Boolean,
        default: false,
       },
       chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
       },
       created_at:{
        type:Date,
        default:new Date()
       }
    }

)

const Message = mongoose.model("Message", messageSchema);
export default Message;