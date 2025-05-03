import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
       from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Parent",
       },
       content:{
        type:String,
        required: true,
       },
       rating:{
        type:Number,
        required:true,
       },
    }

)

const Review = mongoose.model("Review", reviewSchema);
export default Review;