import React from 'react'
import { useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents,Popup } from 'react-leaflet';
import L from 'leaflet'
import marker from '../Assets/Signup/marker.png'
import "leaflet/dist/leaflet.css";  
const MapPicker = ({setLng,setLat,lng,lat}) => {

    function LocationMarker() {
        const map = useMapEvents({
          click(e) {
            setLat(e.latlng.lat);
            setLng(e.latlng.lng);
          },
        });
    
        const markerIcon = L.icon({
          iconUrl: marker,
          iconSize: [24, 36],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
    
        return (
          <Marker position={[lat, lng]} icon={markerIcon}>
            <Popup>You are here</Popup>
          </Marker>
        );
      }
      const getLocation=(e)=>{
        e.preventDefault()
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
          });
      }
      
        return (
            <div className='flex flex-col border-2 border-solid border-blue-primary rounded-xl p-2 h-96'>
                <MapContainer
                center={[lat, lng]}
                zoom={20}
                style={{ height: "95%" }}
                key={`${lat}-${lng}`} // add key prop
                >
                    <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    />
                    <LocationMarker />
                </MapContainer>
                <button onClick={getLocation} className='mt-2 outline outline-2 place-self-center outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-xl hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]'>Ma Location</button>
            </div>
        );
      }
      

export default MapPicker