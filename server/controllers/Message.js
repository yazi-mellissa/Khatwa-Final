import Message from "../models/Message.js";
import Parent from "../models/Parent.js";
import Kindergarten from "../models/Kindergarten.js";
import Notification from "../models/Notification.js";
import Chat from "../models/Chat.js";


export const createMessage = async(req, res ) =>{
     const{
        content,
        from,
     } = req.body;
     const {chatId} = req.params; 
     const pusher = req.pusher;
     try{
         if (!from || !content || !chatId) throw new Error("absence of one of the params");
         let chat = await Chat.findById(chatId);
         if(!chat) throw new Error("chat does not exist");
         let to;
         if(from === chat.parent) to=chat.Kindergarten
         else to = chat.parent;
         let mes = await Message.create({from, content, to, chatId});
         chat.messages.push(mes);
         chat.created_now = false;
         await chat.save();
         pusher.trigger(`chat-${chatId}`, 'new-message', mes);
         res.status(200).json({
            mes,
            message: "successufelly added a message",
         });
      }
      catch(err){
      res.status(404).json({message: err.message});
      }
}


export const getMessageById = async(req, res)=>{
     const {id} = req.body;
     try{
      if(!id) throw new Error("absence of message id");
      const mes = await Message.findById(id);
      if(!mes) res.status(404).json({message: "message not found"});
      else res.status(200).json({
         message:"message found",
         mes,
      });
     }
   catch(err){
      res.status(404).json({
         message:err.message,
      });
   }

}


export const setAsRead = async(req, res)=>{
   const {id} = req.body;
   try{
      if(!id) throw new Error("absence of message id");
      const mes = await Message.findByIdAndUpdate(id, {$set: {is_read: true}});
      if(!mes) throw new Error("message not found");
      else res.status(200).json({
         message:"successefully updated the message",
         mes,
      });
   }
   catch(err){
      res.status(404).json({
         message:err.message,
      });
   }
}


export const updateMessage = async(req, res)=>{
   const{id, content} = req.body;
   const {chatId} = req.params;
   const pusher = req.pusher;
   try{
      if(!id || !content) throw new Error("absence of one of the params");
      const chat = await Chat.find(chatId);
      if(!chat) throw new Error("chat not found");
      const mes = await Message.findByIdAndUpdate(id,{$set: {content: content}});
      if(!mes) throw new Error("message not found");
      pusher.trigger(`chat-${chatId}`, 'updated-message', mes);
      res.status(200).json({
         message: "message successfully updated",
         mes,
      });
   }     
   catch(err){
      res.status(404).json({
         message:err.message,
      });
   }
   
}



export const deleteMessage = async(req, res)=>{
   const {mesId} = req.body;
   const {chatId} = req.params;
   const pusher = req.pusher;
   try{
     if(!mesId || chatId) throw new Error("absence of one of the params");
     let chat = await Chat.find(chatId);
     if(!chat) throw new Error("chat not found");
     await Message.findByIdAndDelete(mesId);
     chat.messages.pull(mesId);
     await chat.save()
     pusher.trigger(`chat-${chatId}`, 'deleted-message', mesId);
     res.status(200).json({
      message: "message successfully deleted",
     }); 
   }
   catch(err){
      res.status(404).json({
         message: err.message,
      });
   }
}




    