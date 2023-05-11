import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getInitiative} from "../services/InitiativeService";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/initiative.css';
import ImageSlider from "../components/ImageSlider";
import L from "leaflet";

function Info(){
    const location = useLocation();
    const path = location.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1);
    
    const [initiative, setInitiative] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getInitiative(id)
            .then((data) => {
                setInitiative(data);
                setLoaded(true);
            })
            .catch((ex) => alert(ex.message))

    }, [])

    if (!loaded) return ;
    console.log(initiative)

    const markerIcon = L.icon({
        iconUrl: 'https://t.ly/g1WM',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });

    return(
        <div className="card">
            <h2>{initiative.name}</h2>
            <div className="slider-container">
                <ImageSlider images={initiative.images} />
            </div>
            <div>
                <MapContainer center={[48.70711909612996, 44.50666693223726]}
                              zoom={13}
                              style={{
                                  marginTop: '5%',
                                  marginLeft: '25%',
                                  marginBottom: '5%',
                                  height: '50vh',
                                  width: '50vw'}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="<attribution>"
                    />
                    <Marker
                        position={[initiative.x, initiative.y]}
                        icon={markerIcon}
                    >
                        <Popup>
                            <strong>{initiative.name}</strong>
                        </Popup>
                    </Marker>
                </MapContainer>
                {/*<MapContainer center={[initiative.x, initiative.y]} zoom={15} scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{48.70772853476065}/{44.51745986938477}.png" />
                    <Marker position={[initiative.x, initiative.y]}>
                        <Popup>
                            <strong>{initiative.name}</strong>
                        </Popup>
                    </Marker>
                </MapContainer>*/}
            </div>
        </div>
    );
}

export default Info;