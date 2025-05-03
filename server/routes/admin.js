import express from "express";
import {getAllParents,
        getAllChildren,
        deleteParent,
        deleteChild,
        getParentById,
        getParentByName } from "../controllers/Parents.js";
import roles from "../config/Roles.js";
import { getAllKindergarten,
         DeleteKindergarten,
        getKindergartenById} from "../controllers/Kindergarten.js";
import { AdminRegister,
        AdminLogin,
        getAllAdmins,
        getAdminsByRole,
        changeAdminRole,
        deleteAccount,
        deleteAdmin,
        adminDashboard,
        adminStats} from "../controllers/Admin.js";
import {verifyToken} from "../middleware/Adminautho.js";
import { getChatById, deleteChat, getAllChats } from "../controllers/Chat.js";

const router = express.Router();
router.post("/register", AdminRegister);
router.post("/login", AdminLogin);
router.delete("/deleteaccount", verifyToken, deleteAccount);
//router.delete("/parents/:id/children/:childId",verifyToken, deleteChild);
//router.get("/parents/:id/children",verifyToken, getAllChildren);
//router.get("parents/:id/chats/:chatId", verifyToken, getChatById);
//router.delete("parents/:id/chats/:chatId", verifyToken, deleteChat);
//router.get("/parents/:id/chats", verifyToken, getAllChats);
router.get("/parents/:id",verifyToken, getParentById);
router.delete("/parents/:id",verifyToken, deleteParent);
router.get("/parents", verifyToken,getAllParents);
//router.get("/admins/roles", verifyToken, getAdminsByRole);
router.patch("/admins/:id", verifyToken, changeAdminRole);
//router.get("/admins/:id", verifyToken, getAdminsByRole);
router.delete("/admins/:id", verifyToken, deleteAdmin);
router.delete("/kindergartens/:id", verifyToken, DeleteKindergarten);
router.get("/kindergartens/:kinderId", verifyToken, getKindergartenById);
router.get("/kindergartens", verifyToken, getAllKindergarten);
router.get("/accueil", verifyToken, adminDashboard);
router.get("/accueil/y", verifyToken,(req, res, next)=>{
    req.body.period = "y";
    next();   
} , adminStats );
router.get("/accueil/m", verifyToken,(req,res,next)=>{
    req.body.period = "m";
    next();
} , adminStats );
router.get("/accueil/w", verifyToken,(req, res, next)=>{
    req.body.period = "w";
    next();
} , adminStats );


export default router;
