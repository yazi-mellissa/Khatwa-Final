import express from "express";
import { parentRegister, parentLogin } from "../controllers/Parentauth.js";
import { verifyToken } from "../middleware/Parentautho.js";
import { deleteParent,
         updateParentPassword,
         getAllChildren,
         getChildById,
         addChild,
         deleteChild,
         getAllSubscribedKindergartens, updateAccount
       } from "../controllers/Parents.js";
import { createRendezVous,
         getRendezVousById,
         getAllRendezVous,
         changeRendezVousStatus  } from "../controllers/RendezVous.js";
import { getAllNotification } from "../controllers/Notification.js";
import { createReview, getAllReviews } from "../controllers/Review.js";
import {createMessage, updateMessage, deleteMessage} from "../controllers/Message.js";
import { getKindergartenById } from "../controllers/Kindergarten.js";
import { createPreInscription, getPreInscriptionById,changePreInscriptionStatus } from "../controllers/Preinscription.js";
import { getProfile } from "../controllers/Parents.js";
import roles from "../config/Roles.js";
import {verifyRoles} from "../middleware/verifyRoles.js";
import { getAllChats,createChat,getChatById, deleteChat} from "../controllers/Chat.js";
import uploadImage from "../middleware/uploadImage.js";
import { searchByCriteria,getKindergartenByName, getAllKindergartenSearch } from "../controllers/searchEngine.js";
const router = express.Router();
router.post("/register", parentRegister);
router.post("/login", parentLogin);
router.get("/profile", verifyToken, getProfile);
router.patch("/profile", verifyToken, updateAccount);
router.delete("/deleteaccount",verifyToken, deleteParent);
router.get("/accueil", verifyToken, getAllSubscribedKindergartens);
router.post("/search", verifyToken, searchByCriteria);
router.get("/children", verifyToken, getAllChildren);
router.post("/children", verifyToken,addChild);
router.patch("/password", verifyToken,updateParentPassword);
router.post("/chats", verifyToken, createChat);
router.get("/chats", verifyToken, getAllChats);
router.get("/chats/:chatId", verifyToken, getChatById);
router.post("/chats/:chatId", verifyToken,createMessage);
router.patch("/chats/:chatId", verifyToken, updateMessage);
router.delete("/chats/:chatId", verifyToken,  deleteChat);
router.get("/children/:childId", verifyToken, getChildById);
router.delete("/children/:childId", verifyToken,deleteChild);
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

router.get("/kindergarten/:kinderId", verifyToken, getKindergartenById);
router.get("/kindergarten/name/:name", verifyToken, getKindergartenByName);
router.get("/kindergarten", verifyToken, getAllKindergartenSearch);
router.post("/preinscription", verifyToken, createPreInscription);
router.patch("/preinscriptions/:inscId", verifyToken, changePreInscriptionStatus);
router.post("/reviews/:kindergartenId", verifyToken, createReview);
router.post("/rendezvous/:kindergartenId", verifyToken, createRendezVous);
router.patch("/rendezvous/:rvId", verifyToken, changeRendezVousStatus);

router.get("/notifications", verifyToken, getAllNotification);
export default router;


