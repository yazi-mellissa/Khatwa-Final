import express from "express";
import { KindergartenLogin,
         KindergartenRegister,
         UpdateKindergarten,
         getAllChildren ,
        getMyKindergarten,
        updateProfile} from "../controllers/Kindergarten.js";
import { getParentById } from "../controllers/Parents.js";
import { createChat,
         getChatById,
         getChatByParentnKinder,
         deleteChat,
         getAllChats } from "../controllers/Chat.js";
import { createMessage,
         updateMessage } from "../controllers/Message.js";
import { getPreInscriptionById, getAllPreInscriptions, changePreInscriptionStatus } from "../controllers/Preinscription.js";
import {verifyToken} from "../middleware/Kindergartenautho.js";
import roles from "../config/Roles.js";
import { getNumbersNParents } from "../controllers/Kindergarten.js";
import { getStatisticsByPeriod } from "../controllers/Kindergarten.js";
import { getAllEvents,
         getEventById,
         addEvent,
         deleteEvent   } from "../controllers/Event.js";
import { createRendezVous,
         getRendezVousById,
         getAllRendezVous,
         changeRendezVousStatus  } from "../controllers/RendezVous.js";
import { getAllNotification } from "../controllers/Notification.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();
router.post('/register', KindergartenRegister);
router.get("/parent/:id", verifyToken, getParentById);
router.get("/profile", verifyToken, getMyKindergarten);
router.patch("/profile", verifyToken, updateProfile);
router.post('/login', KindergartenLogin);
//router.delete("/deleteaccount",verifyToken,verifyRoles(roles.parent, roles.admin), deleteParent);
router.get("/children", verifyToken, getAllChildren);
//router.patch("/password", verifyToken,verifyRoles(roles.parent), updateParentPassword);
router.get("/accueil", verifyToken, getNumbersNParents);
router.get("/accueil/y", verifyToken,(req, res, next)=>{
    req.body.period = "y";
    next();   
} , getStatisticsByPeriod );
router.get("/accueil/m", verifyToken,(req,res,next)=>{
    req.body.period = "m";
    next();
} , getStatisticsByPeriod );
router.get("/accueil/w", verifyToken,(req, res, next)=>{
    req.body.period = "w";
    next();
} , getStatisticsByPeriod );

router.post("/chats", verifyToken,  createChat);
router.get("/chats", verifyToken, getAllChats);
router.get("/chats/:chatId", verifyToken,  getChatById);
router.post("/chats/:chatId", verifyToken, createMessage);
router.patch("/chats/:chatId", verifyToken,  updateMessage);
router.delete("/chats/:chatId", verifyToken, deleteChat);
//router.get("/children/:childId", verifyToken,verifyRoles(roles.parent, roles.admin, roles.moderator), getChildById);
//router.delete("/children/:childId", verifyToken, verifyRoles(roles.parent),deleteChild);
router.get("/preinscriptions", verifyToken,  getAllPreInscriptions);
router.get("/preinscriptions/:inscId", verifyToken,  getPreInscriptionById);
router.patch("/preinscriptions/:inscId", verifyToken, changePreInscriptionStatus);
router.get("/events", verifyToken, getAllEvents);
router.get("/events/:eventId", verifyToken , getEventById);
router.post("/events", verifyToken, addEvent);
router.delete("/events/:eventId", verifyToken, deleteEvent);
router.get("/rendezvous", verifyToken,  getAllRendezVous);
router.get("/rendezvous/:rvId", verifyToken,  getRendezVousById);
router.patch("/rendezvous/:rvId", verifyToken, changeRendezVousStatus);
router.get("/notifications", verifyToken, getAllNotification);
router.post('/images', (req, res) => {
    uploadImage(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error uploading file' });
      }
  
      // Save image data to a JavaScript object
      const imageData = {
        name: req.body.name,
        description: req.body.description,
        imageURL: `http://localhost:3000/uploads/${req.file.filename}`
    };
  
      res.json({ message: 'Image uploaded successfully', imageData });
    });
  });

export default router;