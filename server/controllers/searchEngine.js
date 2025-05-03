import Kindergarten from "../models/Kindergarten.js";
import geolib from "geolib";




export const searchByCriteria = async(req, res)=>{
    try{
        let criteria = {};
        let languages = undefined, services = undefined,days = undefined;
        criteria =  Object.values(req.body)
        .filter((value) => {
            if(typeof(value) === Array) return (value != [])
            else return (value != "")
        })
        .reduce((criteria, value) => {return Object.assign(criteria, { [(Object.keys(req.body).find(key => (req.body[key] === value)))] : value })} , {});
    let {endAge,distance,cout,capacite, rating} = criteria;
    delete criteria.endAge;
    delete criteria.distance;
    delete criteria.cout;
    delete criteria.capacite;
    delete criteria.rating;
    if("languages" in criteria){
        languages = criteria.languages;
        delete criteria.languages;
    }
    if("services" in criteria){
        services = criteria.services;
        delete criteria.services;
    }
    if("days" in criteria){
        days = criteria.days;
        delete criteria.days;
    }
    console.log(criteria);
    let filteredkindergartens = await Kindergarten.find(criteria)
        .where("endAge").lt(endAge)
        .where("cout").lte(cout)
        .where("capacite").lt(capacite)
        .where("rating").gte(rating);
    let kinders = filteredkindergartens.filter(kinder => {
      const kindergartenCoords = { latitude: kinder.lat , longitude: kinder.lng };
      const parentCoords = { latitude: req.user.lat, longitude: req.user.lng};
      const distanceInMeters = geolib.getDistance(parentCoords, kindergartenCoords);
      const distanceInKilometers = distanceInMeters / 1000;
      return distanceInKilometers <= distance;
    })
    filteredkindergartens = kinders.filter(kinder =>{
        if(!languages && !services && !days) return true;
        if(!languages && !services && days) {
            if (days.every(day => kinder.days.includes(day))) return true;
            else return false;
        }
        if(!languages && services && !days) {
            if (services.every(service => kinder.services.includes(service))) return true;
            else return false;
        };
        if(languages && !services && !days) {
            if (languages.every(language => kinder.languages.includes(language))) return true;
            else return false;
        };
        if(!languages && services && days) {
            if ((days.every(day => kinder.days.includes(day))) && (services.every(service => kinder.services.includes(service)))) return true;
            else return false;
        };
        if(languages && !services && days) {
             if ((days.every(day => kinder.days.includes(day))) && (languages.every(language => kinder.languages.includes(language)))) return true;
            else return false;
        };
        if(languages && services && !days) {
            if ((languages.every(language => kinder.languages.includes(language))) && (services.every(service => kinder.services.includes(service)))) return true;
            else return false;
        };
        if(languages && services && days) {
            if (((days.every(day => kinder.days.includes(day)))) && (languages.every(language => kinder.languages.includes(language))) && (services.every(service => kinder.services.includes(service)))) return true;
            else return false;
        };
    })
    kinders = filteredkindergartens.map(kinder =>{
        let{etabName,profilePic,startHour,endHour,lng,lat, _id } = kinder;
        let wilaya = kinder.location.wilaya;
        let commune = kinder.location.commune;
        let kindergartenCoords = { latitude: lat, longitude: lng };
        let days = kinder.days;
        let parentCoords = { latitude: req.user.lat, longitude: req.user.lng};
        console.log(kindergartenCoords);
        console.log(parentCoords);
        let distance = geolib.getDistance(parentCoords, kindergartenCoords) / 1000;
        return({etabName, profilePic,startHour, endHour, distance,wilaya, commune, days, _id});
    })

    res.status(200).json({
        message:"filtering done with success",
        kindergartens:kinders
    });
 }
 catch(err){
    res.status(500).json({
        message:err.message,
    });
 }
}


export const getKindergartenByName = async (req, res) => {
    const { name } = req.params;
    try {
      if (!name) throw new Error("absence of kindergarten name");
      let kindergartens = await Kindergarten.find({etabName:{ $regex: '^' + name, $options: 'i' }}).exec()
      if (kindergartens.length===0) throw new Error("Kindergarten not found");
      let kinders=[]
      kinders = kindergartens.map(kinder =>{
        let{etabName,profilePic,startHour,endHour,lng,lat, _id } = kinder;
        let wilaya = kinder.location.wilaya;
        let commune = kinder.location.commune;
        let kindergartenCoords = { latitude: lat, longitude: lng };
        let days = kinder.days;
        let parentCoords = { latitude: req.user.lat, longitude: req.user.lng};
        console.log(kindergartenCoords);
        console.log(parentCoords);
        let distance = geolib.getDistance(parentCoords, kindergartenCoords) / 1000;
        return({etabName, profilePic,startHour, endHour, distance,wilaya, commune, days, _id});
    })

    res.status(200).json({
        message:"filtering done with success",
        kindergartens:kinders
    });

    } 
    catch (err) {
      res.status(500).json({ error: err.message,kindergartens:[] });
    }
  };

  export const getAllKindergartenSearch = async (req, res) => {
    try {
        const kindergartens = await Kindergarten.find();
        if (kindergartens.length === 0) res.status(200).json({
            message: "There are no kindergartens",
        }) ;
        else {
            let kinders=[]
            kinders = kindergartens.map(kinder =>{
                let{etabName,profilePic,startHour,endHour,lng,lat, _id } = kinder;
                let wilaya = kinder.location.wilaya;
                let commune = kinder.location.commune;
                let kindergartenCoords = { latitude: lat, longitude: lng };
                let days = kinder.days;
                let parentCoords = { latitude: req.user.lat, longitude: req.user.lng};
                console.log(kindergartenCoords);
                console.log(parentCoords);
                let distance = geolib.getDistance(parentCoords, kindergartenCoords) / 1000;
                return({etabName, profilePic,startHour, endHour, distance,wilaya, commune, days, _id});
            })
        
            res.status(200).json({
                message:"filtering done with success",
                kindergartens:kinders
            });
        }; 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };