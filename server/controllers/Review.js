import Parent from "../models/Parent.js";
import Kindergarten from "../models/Kindergarten.js";
import Notification from "../models/Notification.js";
import Review from "../models/Review.js";
import { createNotification } from "./Notification.js";
import notificationTypes from "../config/notificationTypes.js";


export const createReview = async(req, res ) =>{
   const{
      content,
      rating,
   } = req.body;
   const {kindergartenId} = req.params;
   try{
       if (!content || !rating || !kindergartenId) throw new Error("absence of one of the params");
       let review = await Review.create({from:req.user._id, content:content, rating:rating});
       await Kindergarten.findByIdAndUpdate(kindergartenId, {$push: {reviews: review._id}});
       console.log(kindergartenId)
       let kindergarten = await Kindergarten.findById(kindergartenId).populate("reviews");   
       let total = 0;
       for (let i=0;i<kindergarten.reviews.length;i++ ){
         total+= kindergarten.reviews[i].rating;
       }
       let acc = parseFloat(total) / kindergarten.reviews.length;
       let k = await Kindergarten.findByIdAndUpdate(kindergartenId, {rating: acc});
       let p = await Parent.findById(req.user._id);
       await createNotification(k, p, notificationTypes.com, null);
       res.status(200).json({
          review,
          message: "successufelly added a review",
       });
    }
    catch(err){
    res.status(404).json({message: err.message});
    }
}


export const getReviewById = async(req, res)=>{
     const {id} = req.body;
     try{
      if(!id) throw new Error("absence of review id");
      const review = await Review.findById(id);
      if(!review) res.status(404).json({message: "review not found"});
      else res.status(200).json({
         message:"review found",
         review,
      });
     }
   catch(err){
      res.status(404).json({
         message:err.message,
      });
   }

}



export const updateReview = async(req, res)=>{
   const{id, content, rating} = req.body;
   try{
      if(!id || !content|| !rating) throw new Error("absence of one of the params");
      const review = await Review.findById(id);
      if(!review) throw new Error("review not found");
      if(req.user._id != review.from) throw new Error("You don't have the permission to edit this");
      await Review.findByIdAndUpdate(id,{$set: {content: content, rating: rating}});
      res.status(200).json({
         message: "review successfully updated",
         review,
      });
   }     
   catch(err){
      res.status(404).json({
         message:err.message,
      });
   }
   
}



export const deleteReview = async(req, res)=>{
   const {reviewId, kinderId} = req.body;
   try{
     if(!reviewId || kinderId) throw new Error("absence of one of the params");
     const review = await Review.findById(id);
     if(!review) throw new Error("review not found");
     if(req.user._id != review.from) throw new Error("You don't have the permission to edit this");
     await Review.findByIdAndDelete(reviewId);
     await Kindergarten.findByIdAndUpdate(kinderId, {$pull: {reviews: reviewId}});
     res.status(200).json({
      message: "review successfully deleted",
     }); 
   }
   catch(err){
      res.status(404).json({
         message: err.message,
      });
   }
}



export const getAllReviews = async(req, res) =>{
    const {kinderId} = req.body;
    try{
        
        if (!kinderId) throw new Error("kindergarten id is not present");
        const kindergarten = await Kindergarten.findById(kinderId).populate("reviews");
        const reviews = kindergarten.reviews;
        if(reviews.length === 0) res.status(200).json({message: "kindergarten doesnt have any reviews"});
        else{ 
           res.status(200).json(reviews);
        }
    }    
    catch(err){
        res.status(404).json({message: err.message});
    }   




}