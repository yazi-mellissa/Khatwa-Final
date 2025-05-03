import express from 'express';
import Event from "../models/Event.js";
import Kindergarten from '../models/Kindergarten.js';
import Parent from '../models/Parent.js';

/* Add An Event */
import notificationTypes from '../config/notificationTypes.js';
import { createNotification } from './Notification.js';

export const addManualEvent = async (req,evenement) =>{
  const {
        persons,
        title ,
        description,
        type,
        start,
        end,
    } = evenement;
        const savedEvent = new Event({
            persons: persons,
            kindergarten: req.user._id,
            title,
            description,
            type,
            start,
            end,
          });
          let event = await Event.create(savedEvent);
          await Kindergarten.findByIdAndUpdate(req.user._id, {$push:{events:event._id}});
          let p =[];
          p = persons.map(async(person)=> {
            await Parent.findByIdAndUpdate(person, {$push:{events:event._id}});
            let pp = await Parent.findById(person);
            return pp;
          })
          p = await Promise.all(p);
          let k = await Kindergarten.findById(req.user._id);
          await createNotification(k, p, notificationTypes.event, event);
          persons.forEach(async(person)=> {
            await Parent.findByIdAndUpdate(person, {$push:{events:event._id}});
          })
}


export const addEvent = async (req, res) => {
    const {
        persons,
        title ,
        description,
        type,
        start,
        end,
    } = req.body;
    try {
        const savedEvent = new Event({
            persons: persons,
            kindergarten: req.user._id,
            title,
            description,
            type,
            start,
            end,
          });
          let event = await Event.create(savedEvent);
          await Kindergarten.findByIdAndUpdate(req.user._id, {$push:{events:event._id}});
          let p =[];
          p = persons.map(async(person)=> {
            await Parent.findByIdAndUpdate(person, {$push:{events:event._id}});
            let pp = await Parent.findById(person);
            return pp;
          })
          p = await Promise.all(p);
          let k = await Kindergarten.findById(req.user._id);
          await createNotification(k, p, notificationTypes.event, event);
          res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Get An Event By The Id */

export const getEventById = async (req, res) => {
    const { eventId } = req.body;
    try {
        const event = await Event.findById(eventId);
        if (!event) throw new Error("event not found");
        else res.status(200).json({
            message:"event found",
            event 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Get All The Events */

export const getAllEvents = async (req, res) => {
    try {
        let kindergarten = await Kindergarten.findById(req.user._id).populate("events").populate("children");
        let events = kindergarten.events;
        events.forEach(async(event)=>{
            await event.populate("persons")
        });
        let children = kindergarten.children;
        const parents = await Promise.all(children.map(async (child) => {
            await child.populate("parent");
            return {name:child.parent.firstName+' '+child.parent.lastName,id:child.parent._id};
          }));
        console.log(parents);
            res.status(200).json({ 
                message:"events found",
                events,
                parents
            });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Get The Unseen Events */

export const getUnseenEvent = async (req, res) => {
    try {
        const { parent } = req.params;
        const UnseenEvents = await Event.find({ parent: parent, seen: false });
        if (!UnseenEvents){
            return res.status(404).json({ message: 'There are no Unseen Events'});
        }
        res.status(200).json({UnseenEvents})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Update An Event */

export const updateEvent = async (req, res) => {
    let {event, eventId} = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId,event);
        res.status(200).json({
            message: "Updated event with success",
            event: updatedEvent });
        }
    catch (err){
        res.status(500).json({ error: err.message });
    }
};

/* Delete An Event  */


export const deleteEvent = async (req, res) => {
    let {eventId} = req.body;
    try {
        if (!eventId) throw new Error("Couldn't find");
        if (!deletedEvent) throw new Error("Couldn't find");
        let deletedEvent = await Event.findByIdAndDelete(eventId);
        await Kindergarten.findByIdAndUpdate(req.user._id, {$pull:{events:eventId}});
        for (parent in deletedEvent.parents){
            await Parent.findByIdAndUpdate(parent, {$pull:{events:eventId}});
        }
        res.status(200).json({ message: 'Event has been deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





