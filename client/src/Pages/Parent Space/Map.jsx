import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function Map() {
  return (
    <div className='   border-2 border-blue-primary border-opacity-70 rounded-lg'style={{width: "400px", height:'300px'}}>
<MapContainer
   // center={[user.location.latitude, user.location.longitude]}
   center={[51.505, -0.09]}
    zoom={13}
    style={{ height: "100%" }}
    scrollWheelZoom={false}
    >
        <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
    <Marker 
    //</MapContainer>position={[user.location.latitude, user.location.longitude]} 
   
    position={[51.505, -0.09]}
    >
      <Popup>
          Position
        </Popup>
    </Marker>                
</MapContainer>
</div>
  );
}

export default Map;


  