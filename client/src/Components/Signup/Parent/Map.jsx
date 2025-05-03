import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  const [location, setLocation] = useState([51.505, -0.09]);

  const handleMapClick = (event) => {
    console.log(event)
    setLocation([event.latlng.lat, event.latlng.lng]);
  };

  return (
    <div className="relative" style={{ height: "400px" }}>
      <h1>Choose your location</h1>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        onClick={(e)=>handleMapClick(e)}
        >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {location && (
          <Marker position={location}>
            <Popup>Your location</Popup>
          </Marker>
        )}
      </MapContainer>
      {location && (
        <div>
          <h2>Your location:</h2>
          <p>Latitude: {location[0]}</p>
          <p>Longitude: {location[1]}</p>
        </div>
      )}
    </div>
  );
}

export default Map;
