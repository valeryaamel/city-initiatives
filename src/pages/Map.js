import React, { useEffect, useState } from 'react';
import { TileLayer, Marker, Popup, MapContainer} from 'react-leaflet';
import {supabase} from "../persistence/Supabase";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import {useNavigate} from "react-router-dom";

function MapComponent() {
    const [initiatives, setInitiatives] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigation = useNavigate();
    useEffect(() => {
        async function fetchInitiatives() {
            const response = await supabase
                .from('initiatives')
                .select('*');
            const data = response.data;
            setInitiatives(data);
        }
        fetchInitiatives().then(x => setIsLoaded(true));
    }, []);

    if (!isLoaded) return;

    const markerIcon = L.icon({
        iconUrl: 'https://t.ly/g1WM',
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
                            position={[item.point_x, item.point_y]}
                            icon={markerIcon}
                        >
                            <Popup>{item.name}
                            <a href={`/info/${item.id}`}>
                                click
                            </a>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
        </div>
    );
}

export default MapComponent;
