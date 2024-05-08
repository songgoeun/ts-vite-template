import { useState } from 'react';
import './App.css';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import Map from './Map';

function App() {
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const render = (status: Status) => {
    console.log(status);
    return <h1>{status}</h1>;
  };

  const onIdle = (m: google.maps.Map) => {
    console.log('onIdle');
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!} render={render}>
        <Map
          center={center}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: '1', width: '1200px', height: '1300px' }}
        />
      </Wrapper>
    </div>
  );
}

export default App;
