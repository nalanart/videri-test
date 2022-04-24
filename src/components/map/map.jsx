import { Box } from '@mui/material';

import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';

const Map = ({ data }) => {
  const { lon, lat } = data;
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
};

export default Map;