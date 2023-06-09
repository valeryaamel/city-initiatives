import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getEditableInitiative, getInitiative} from "../services/InitiativeService";
import {Button, Container, Form, FormText, ListGroup} from 'react-bootstrap';
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";
import L from "leaflet";
import {supabase} from "../persistence/Supabase";
import {remove} from "leaflet/src/dom/DomUtil";
import {DeleteImage, UploadImage} from "../services/ImageService";
import {getUserId} from "../services/UserService";

function EditInitiative() {
    const location = useLocation();
    const path = location.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1);

    const [position, setPosition] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [addedFiles, setAddedFiles] = useState([]);
    const [removedFiles, setRemovedFiles] = useState([]);

    const [approved, setApproved] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getEditableInitiative(id)
            .then((data) => {
                setName(data.name)
                setDescription(data.description)
                setX(data.x)
                setY(data.y)
                setPosition({lat: data.x, lng: data.y})
                setImages(data.images)
                setFiles(data.images.map((img) => ({
                    source: 'supabase',
                    id: img.id,
                    name: img.image_url,
                    path: img.image_url,
                    data: undefined,
                    extension: undefined
                })))
                getUserId().then((x) => {
                    if (data.owner === x) {
                        setApproved(true);
                    }
                })
                setLoaded(true)
            })
    }, [])

    if (!approved) {
        return ;
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const newFiles = [];
        const added = [];


        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const fileObj = {
                source: 'local',
                extension: file.name.split('.').pop(),
                name: URL.createObjectURL(file),
                id: 0,
                data: file
            };

            newFiles.push(fileObj);
            added.push(fileObj)
        }

        setAddedFiles([...addedFiles, ...added]);
        setFiles([...files, ...newFiles]);
    };

    const handleRemoveFile = async (index) => {
        const newFiles = [...files];

        if (files[index].source === 'supabase') {
            const removed = [...removedFiles]
            removed.push(files[index])
            setRemovedFiles(removed)
        }

        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    function handleMapClick(e) {
        setPosition(e.latlng);
        const { lat, lng } = e.latlng;
        setX(lat);
        setY(lng);
    }

    const markerIcon = L.icon({
        iconUrl: 'https://t.ly/5-J9',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });

    function SetViewOnClick() {
        const map = useMapEvents({
            click: handleMapClick,
        });

        if (position) {
            map.setView(position, map.getZoom());
        }

        return null;
    }

    const update = async () => {
        await supabase
            .from('initiatives')
            .update({
                name: name,
                point_x: x,
                point_y: y,
                description: description
            })
            .eq('id', id)

        for (let i = 0; i < removedFiles.length; i++){
            await DeleteImage(removedFiles[i].id);
        }

        for (let i = 0; i < addedFiles.length; i++){
            await UploadImage(id, addedFiles[i]);
        }

        navigate(`/info/${id}`)
    }

    if (!loaded) return ;

    return(
        <Container>

            <Form>
                <Form.Label>
                    <FormText>Название:</FormText>
                    <Form.Control
                        style={{width: '533%'}}
                        type="text"
                        value={name}
                        onChange={handleNameChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    <FormText>Описание:</FormText>
                    <Form.Control
                        style={{width: '580%'}}
                        as="textarea"
                        value={description}
                        onChange={handleDescriptionChange} />
                </Form.Label>
                <br/>
                <Form.Label>
                    <FormText>Широта:</FormText>
                    <Form.Control
                        type="number"
                        value={x}
                        onChange={(e) => setX(e.target.value)}
                    />
                </Form.Label>
                <br />
                <Form.Label>
                    <FormText>Долгота:</FormText>
                    <Form.Control
                        type="number"
                        value={y}
                        onChange={(e) => setY(e.target.value)}
                    />
                </Form.Label>
            </Form>

            <Form.Label htmlFor="file-input">Прикрепить изображения:</Form.Label>
            <Form.Control
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />

            <ListGroup>
                {files.map((file, index) => (
                    <ListGroup.Item  key={index}>
                        <div>
                            <img src={file.name} alt={file.name} width={100} height={100}/>
                            <Button onClick={() => handleRemoveFile(index)}>Remove</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <MapContainer
                center={[48.70711909612996, 44.50666693223726]}
                zoom={13}
                style={{ height: '400px' }}
                onClick={handleMapClick}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <SetViewOnClick />
                <Marker position={position} icon={markerIcon}/>
            </MapContainer>

            <Button onClick={update} style={
                {
                    marginTop: '2%',
                    marginLeft:'50%'
                }
            }>
                Сохранить
            </Button>
        </Container>
    )
}

export default EditInitiative;