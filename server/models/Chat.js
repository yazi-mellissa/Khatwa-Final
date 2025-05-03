import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema(
    {
       parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Parent',
       },
       kindergarten:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Kindergarten',
       },       
       messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
       }],
       created_now:{
        type:Boolean,
        default:true,
       },
       created_at:{
        type:Date,
        default:new Date(),
       }
    }

)

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;