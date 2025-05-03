import express from "express";
import Notification from "../models/Notification.js";
import Parent from "../models/Parent.js";
import Kindergarten from "../models/Kindergarten.js";
import notificationTypes from "../config/notificationTypes.js";
import roles from "../config/Roles.js";
import moment from "moment";
import "moment/locale/fr.js";
import nodemailer from "nodemailer";
import twilio from "twilio";

/* Get Notification by ID */ 

export const getNotificationById = async (req, res) => {
    try {
        const Id = req.params.id;
        const notification = await Notification.findById(Id);
        if (!notification){
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ notification });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Get All Notifications */ 

export const getAllNotification = async (req, res) => {
    let notifications;
    try {
        if(req.role === roles.parent) notifications = await Notification.find({parent: req.user._id}).populate("kindergarten"); 
        if(req.role === roles.kindergarten) notifications = await Notification.find({kindergarten: req.user._id}).populate("parent"); 
        notifications.forEach(notif =>{
            let now = moment();
            let previous = moment(notif.created_at.toString());
            notif.time_since_created = previous.from(now);
        })
        res.status(200).json({
            message:"notifications found with success",
            notifications : notifications.reverse()
        }); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    finally{
        
        console.log(notifications)
        for (let i=0;i<notifications.length;i++){
            await Notification.findByIdAndUpdate(notifications[i]._id,{$set: {is_read: true}});
        }
    }
};

/* Set A Notification AS Read */

export const setAsRead = async (req, res) => {
    try {
        const Id = req.params.id;
        const ReadNotification = await Notification.findByIdAndUpdate(
            Id,
            { is_read: true },
            { new: true }
        );
        if (!ReadNotification){
            return res.status(404).json({ message: 'Notification not found'});
        }
        res.status(200).json({ReadNotification});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* Get All The Unread Notification For A Certain User */

export const getAllUnread = async (req, res) => {
    try {
        const userId = req.params.userId;
        const UnreadNotifications = await Notification.find({ user: userId, is_read: false });
        if (!UnreadNotifications){
            return res.status(404).json({ message: 'There are no Unread Notifications'});
        }
        res.status(200).json({UnreadNotifications})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}






export const createNotification = async (kindergarten, parent, type, event) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'khatwaforparents@gmail.com',
            pass: 'hlkmmfafridbgwnw'
        }
        });
        const accountSid = "ACaf059bd105c2e4d22a2fa048f38c7b51";
        const authToken = "519163fac15f0054884ec7f81c05cc38";
        const client = twilio(accountSid, authToken);
    let message;
    switch(type){
        case notificationTypes.com:
            message = `${parent.firstName} ${parent.lastName} a fait un commentaire`;
            break;
        case notificationTypes.createinsc:
            message = `${parent.firstName} ${parent.lastName} a fait une preinscription`;
            break;
        case notificationTypes.createrv:
            message = `${parent.firstName} ${parent.lastName} a fait un rendez vous`;
            break;
        case notificationTypes.inscState:
            message = `${kindergarten.etabName} a change l'etat de votre preinscription`;
            break;
        case notificationTypes.rvState:
            message = `${kindergarten.etabName} a change l'etat de votre demande de rendezvous`;
            break;
        case notificationTypes.event:
            message = `${kindergarten.etabName} vous invite a rejoigner son event ${event.title} le ${event.start}`;
            break;
    }    
    let notification;
    let parentsIds = [];
    if(type != notificationTypes.event){
    notification = await Notification.create({
        kindergarten:kindergarten._id,
        parent: new Array(parent._id),
        message,
        type 
    });
    }
    else {
        
        parentsIds = await parent.map(p => p._id);
        notification = await Notification.create({
            kindergarten:kindergarten._id,
            parent: parentsIds,
            message,
            type 
        })
        console.log(kindergarten._id);
    } 
    if((type === notificationTypes.com) || (type === notificationTypes.createinsc)
        || (type === notificationTypes.createrv) ) {
            await Kindergarten.findByIdAndUpdate(kindergarten._id, {$push : {notifications: notification._id}});
            const mailOptions = {
                  from: 'KhatwaForParents@gmail.com',
                  to: kindergarten.email,
                  subject: "A new interaction from a client awaits you",
                  text: message
            };
            if(kindergarten.notificationMail === true){
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                }
            });
        }
            if(kindergarten.notificationSMS === true){
                client.messages
                .create({ body: message, from: "+13613090945", to: "+213".concat(kindergarten.phone) })
                .then(message => console.log(message.sid));
            }
        }  
    else if((type === notificationTypes.rvState) || (type === notificationTypes.inscState)
         ) {
            await Parent.findByIdAndUpdate(parent._id, {$push : {notifications: notification._id}});
            const mailOptions = {
                  from: 'KhatwaForParents@gmail.com',
                  to: parent.email,
                  subject: "A new interaction from a kindergarten awaits you",
                  text: message
            };
            if(parent.notificationMail === true){
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                }
            }); 
        }
        if(parent.notificationSMS === true){
                client.messages
                .create({ body: message, from: "+13613090945", to: "+213".concat(parent.phone) })
                .then(message => console.log(message.sid));
            }
        }

    else if (type === notificationTypes.event) {
        parent.forEach(async(element) => {
            await Parent.findByIdAndUpdate(element._id, {$push : {notifications: notification._id}})
            const mailOptions = {
                  from: 'khatwaforparents@gmail.com',
                  to: element.email,
                  subject: "A new interaction from a kindergarten awaits you",
                  text: message
            };
            if(element.notificationMail === true){
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                }
            });
        }
        if(element.notificationSMS === true){
                client.messages
                .create({ body: message, from: "+13613090945", to: "+213".concat(element.phone) })
                .then(message => console.log(message.sid));
            }
        });
    }
}




  