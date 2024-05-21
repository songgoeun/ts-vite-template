import { useState } from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import Map from './Map';
import Marker from './Marker';

function App() {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const render = (status: Status) => {
    console.log(status);
    return <h1>{status}</h1>;
  };

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log('onIdle');
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  // const mapOptions = {
  //   mapTypeControl: true,
  //   mapTypeControlOptions: {
  //     style: google.maps.MapTypeControlStyle.DEFAULT,
  //     position: google.maps.ControlPosition.TOP_LEFT, // 원하는 위치로 변경
  //   },
  // };
  const form = (
    <div
      style={{
        padding: '1rem',
        flexBasis: '250px',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) => setCenter({ ...center, lat: Number(event.target.value) })}
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) => setCenter({ ...center, lng: Number(event.target.value) })}
      />
      <h3>{clicks.length === 0 ? 'Click on map to add markers' : 'Clicks'}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!} render={render}>
        <Map
          center={center}
          onIdle={onIdle}
          onClick={onClick}
          zoom={zoom}
          style={{ flexGrow: '1', height: '100%' }}
        >
          {clicks.map((latLng, i) => {
            return <Marker key={i} position={latLng} />;
          })}
        </Map>
        {form}
      </Wrapper>
    </div>
  );
}

export default App;
