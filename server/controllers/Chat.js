import Message from "../models/Message.js";
import Parent from "../models/Parent.js";
import Kindergarten from "../models/Kindergarten.js";
import Notification from "../models/Notification.js";
import Chat from "../models/Chat.js";
import roles from "../config/Roles.js";

export const createChat = async(req, res ) =>{
     const {partner} = req.body; 
     try{
      let parent;
      let kindergarten;
         if(req.role === roles.parent){
            parent = req.user._id;
            kindergarten = partner;
         }
         else{
            kindergarten = req.user._id;
            parent = partner;
         }
         if (!parent || !kindergarten)  throw new Error("absence of one of the params");
         let chat = await Chat.find({parent:parent, kindergarten:kindergarten});
         if(chat.length > 0) res.status(200).json({
            message:"chat already exists",
            chat,
         });
         else{
            chat = await Chat.create({
             parent: parent,
             kindergarten:kindergarten,
             messages:[]
         });
         await Parent.findByIdAndUpdate(parent, {$push:{chats:chat}});
         await Kindergarten.findByIdAndUpdate(kindergarten, {$push:{chats:chat}});
         res.status(200).json({
            chat,
            message: "successufelly added a chat ",
         });
      }
      }
      catch(err){
      res.status(404).json({message: err.message});
      }
}


export const getChatById = async(req, res)=>{
     const {chatId} = req.params;
     try{
      if(!chatId) throw new Error("absence of chat id");
      const chat = await Chat.findById(chatId).populate("messages");
      if((chat.parent === req.user._id) || (chat.kindergarten === req.user._id)) throw new Error("you dont have permissions");
      if(!chat) throw new Error("chat not found");
      else{
         res.status(200).json({
         message:"chat found",
         chat,
      });
   }
     }
   catch(err){
      res.status(404).json({
         message:err.message,
      });
   }

}


export const getChatByParentnKinder = async(req, res)=>{
    const{parentId,kinderId} = req.body;
    try{
        if(!parentId || !kinderId) throw new Error("absence of one of the params");
        const chat = await Chat.findOne({parent:parentId, kindergarten: kinderId});
        if(!chat) res.status(404).json({
            message:"chat not found",
        });
        else res.status(200).json({
            message:"chat found",
            chat,
        });
    }
    catch(err){
        res.status(404).json({
            message: err.message,
        });
    }
}


export const deleteChat = async(req, res)=>{
   const {chatId} = req.params;
   try{
     if(!chatId) throw new Error("absence of chat id");
     let chat = await Chat.findById(chatId);
     if((chat.parent != req.user._id) && (chat.kindergarten != req.user._id)) res.status(401).json({
      message:"You don't have the permissions required",
     });
     await Chat.findByIdAndDelete(chatId);
     await Parent.findByIdAndUpdate(chat.parent, {$pull: {chats: chatId}});
     await Kindergarten.findByIdAndUpdate(chat.kindergarten, {$pull: {chats:chatId}});
     res.status(200).json({
      message: "chat successfully deleted",
     }); 
   }
   catch(err){
      res.status(404).json({
         message: err.message,
      });
   }
}


export const getAllChats = async(req, res)=>{
   try{
     let Chats = [];
     let chats;
     let finalChats;
     let elem;
    if(req.user.role === roles.parent){
      chats = await Chat.find({parent: req.user._id}).populate("kindergarten").populate("messages");
      chats.map(async(chat)=>{
         let msg;
         if(chat.messages.length === 0) msg = "";
         else msg = chat.messages[chat.messages.length - 1];
         let {etabName, profilePic} = chat.kindergarten;
         let {created_now} = chat;
         let kindergartenId = chat.kindergarten._id;
         delete chat.kindergarten;
         delete chat.messages;
         let _id = chat._id;

         elem = { etabName,profilePic,  _id, msg, partner:kindergartenId, created_now};
         Chats.push(elem);
      })

      if(Chats.length === 0) throw new Error("user doesn't have any chats");
      Chats.sort((a, b) => a.msg.created_at - b.msg.created_at);
     }
     else {
        chats = await Chat.find({kindergarten: req.user._id}).populate("parent").populate("messages");
        chats.map(async(chat)=>{
         let msg;
         if(chat.messages.length === 0) msg = "";
           else msg = chat.messages[chat.messages.length - 1];
           let {firstName, lastName, image} = chat.parent;
           let {created_now} = chat;
           delete chat.parent;
           delete chat.messages;
           let parentId = chat.parent._id;
           let _id = chat._id;
           elem = { firstName,lastName, image, _id,partner:parentId, msg, created_now};
           Chats.push(elem);
        })
  
        if(Chats.length === 0) throw new Error("kindergarten doesnt have any chats");
        
       
     }
      let newChat = await Chats.find(chat => chat.created_now === true);
      console.log(newChat);
      if(newChat){finalChats = Chats.filter(async(chat)=> {
         if((chat.msg === '') && (chat._id != newChat._id)) {
            await Kindergarten.findByIdAndUpdate(req.user.id, {$pull:{chats:chat._id}});
            await Parent.findByIdAndUpdate(chat.parent, {$pull:{chats:chat._id}});
            await Chat.findByIdAndDelete(chat._id);
            return false;
         }
         else if(chat._id === newChat._id) return false;
         else return true
      });
   }
      else{finalChats = Chats.filter(async(chat)=> {
         if(chat.msg === '')  {
            await Kindergarten.findByIdAndUpdate(req.user.id, {$pull:{chats:chat._id}});
            await Parent.findByIdAndUpdate(chat.parent, {$pull:{chats:chat._id}});
            await Chat.findByIdAndDelete(chat._id);
            return false;
         }
         else return true
      });}
      finalChats.sort((a, b) => a.msg.created_at - b.msg.created_at);
      if(newChat) finalChats.unshift(newChat);
      Chats = finalChats.filter((chat, index) => {
             const _value = JSON.stringify(chat);
             return index === finalChats.findIndex(obj => {
             return JSON.stringify(obj) === _value;
            });
            });
           res.status(200).json(Chats);
    }    
    catch(err){
        res.status(404).json({message: err.message});
    }
  
  }



