import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {approveInitiative, declineInitiative, getInitiative} from "../services/InitiativeService";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/initiative.css';
import ImageSlider from "../components/ImageSlider";
import L from "leaflet";
import {GetUser, getUserId} from "../services/UserService";
import App from "../App";

function Info(){
    const location = useLocation();
    const path = location.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1);
    const navigate = useNavigate();
    
    const [initiative, setInitiative] = useState({});
    const [editable, setEditable] = useState(false);
    const [editor, setEditor] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        GetUser().then((data) => {
            if (data.role === 1 || data.role === 2) {
                setEditor(true);
            }
        })
        getInitiative(id)
            .then((data) => {
                setInitiative(data);
                getUserId().then((x) => {
                    if (data.owner === x) {
                        setEditable(true)
                    }
                })
                setLoaded(true);
            })
            .catch((ex) => alert(ex.message))

    }, [])

    const Approve = async () => {
        await approveInitiative(id)
        window.location.reload()
    }

    const Decline = async () => {
        await declineInitiative(id)
        window.location.reload()
    }

    if (!loaded) return ;

    const markerIcon = L.icon({
        iconUrl: 'https://t.ly/5-J9',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });

    return(
        <div className="card">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
            <h2>{initiative.name}</h2>

            {
                editable ?
                    <div className="d-flex justify-content-center">
                        <a
                            href={`/edit/${initiative.id}`}
                            className="btn btn-primary mt-3">Редактировать</a>
                    </div>
                    :
                    <br/>
            }

            <div className="slider-container">
                <ImageSlider images={initiative.images} />
            </div>
            <text style={{textAlign: 'center', marginTop: '3%'}}>
                {initiative.description}
            </text>
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
            </div>

            {
                (editor && initiative.status === 1) ?
                    <div style={{marginBottom: '5%'}} className="d-flex justify-content-center">
                        <button
                            onClick={() => Approve()}
                            className="btn btn-primary mt-3">Одобрить</button>
                        <button
                            onClick={() => Decline()}
                            style={{marginLeft: '10px'}}
                            className="btn btn-danger mt-3">Отказать</button>
                    </div>
                    :
                    <div/>
            }

        </div>
    );
}

export default Info;