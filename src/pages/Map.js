import React, { useEffect, useState } from 'react';
import { TileLayer, Marker, Popup, MapContainer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import {getInitiatives} from "../services/InitiativeService";

function MapComponent() {
    const [initiatives, setInitiatives] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getInitiatives().then(data => {
            setInitiatives(data)
            console.log(data)
            setIsLoaded(true)
        })
    }, []);

    if (!isLoaded) return;

    const markerIcon = L.icon({
        iconUrl: 'https://t.ly/5-J9',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });

    console.log(initiatives)
    return (
        <div>
            {initiatives.length > 0 && (
                <MapContainer center={[48.70711909612996, 44.50666693223726]}
                              zoom={13}
                              style={{
                                  height: '94vh',
                                  width: '100vw'}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="<attribution>"
                    />

                    {initiatives.map((item) => (
                        <Marker
                            key={item.id}
                            position={[item.x, item.y]}
                            icon={markerIcon}
                        >
                            <Popup>
                                <label>{item.name}</label>
                                <br/>
                                <img alt={'pic'} width={'100px'} height={'100px'} src={item.image} />
                                <br/>
                                <br/>
                                <a href={`/info/${item.id}`}>Подробнее</a>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
        </div>
    );
}

export default MapComponent;
