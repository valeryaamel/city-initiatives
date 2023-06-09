import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {supabase} from "../persistence/Supabase";
import {useNavigate} from "react-router-dom";
import {Button, Container, Form, ListGroup, FormText} from 'react-bootstrap';
import {IsAuthenticated} from "../services/UserService";
function CreateInitiatives() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [auth, setAuth] = useState(false);
    const [position, setPosition] = useState(null);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        IsAuthenticated().then((data) => {
            setAuth(data)
        })
    }, [])

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    function handleMapClick(e) {
        setPosition(e.latlng);
        const { lat, lng } = e.latlng;
        setX(lat);
        setY(lng);
    }

    function SetViewOnClick() {
        const map = useMapEvents({
            click: handleMapClick,
        });

        if (position) {
            map.setView(position, map.getZoom());
        }

        return null;
    }

    const markerIcon = L.icon({
        iconUrl: 'https://t.ly/5-J9',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const newFiles = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            newFiles.push({
                name: file.name,
                size: file.size,
                type: file.type,
                file: file,
                data: URL.createObjectURL(file),
            });
        }

        setFiles([...files, ...newFiles]);
    };

    const handleRemoveFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };
    function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    async function create(){
        const ownerId = (await supabase.auth.getUser()).data.user.id
        const initiative = {
            name: name,
            point_x: x,
            point_y: y,
            description: description,
            owner: ownerId
        }

        const {data: iData} = await supabase
            .from('initiatives')
            .insert(initiative)
            .select()


        for(let i = 0; i < files.length; i++){
            console.log(files[0])
            const { data: imgData} = await supabase
                .storage
                .from('images')
                .upload(`${iData[0].id}/${uuidv4()}-${files[i].name}`, files[i].file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            const {data: fileData} = supabase.storage.from('images').getPublicUrl(imgData.path)

            const initiative_image = {
                image_url: fileData.publicUrl,
                initiative_id: iData[0].id
            }

            const {data, error} = await supabase
                .from('initiatives_images')
                .insert(initiative_image)
        }

        navigate(`/info/${iData[0].id}`)
    }

    if (!auth) return;

    return (
        <Container>
            <Form>
                <Form.Label>
                    <FormText>Название:</FormText>
                    <Form.Control style={{width: '533%'}} type="text" value={name} onChange={handleNameChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    <FormText>Описание:</FormText>
                    <Form.Control style={{width: '580%'}} as="textarea" value={description} onChange={handleDescriptionChange} />
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

            <div>
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
                                <strong>{file.name}</strong> ({file.type}, {file.size} bytes)
                                <Button onClick={() => handleRemoveFile(index)}>Remove</Button>
                            </div>
                            <img src={file.data} alt={file.name} width={100} height={100}/>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>


            <br />
            <MapContainer
                center={[48.70711909612996, 44.50666693223726]}
                zoom={13}
                style={{ height: '400px' }}
                onClick={handleMapClick}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <SetViewOnClick />
                {position && <Marker position={position} icon={markerIcon}/>}
            </MapContainer>
            <br/>
        <Button onClick={create} style={
            {
                marginLeft:'50%'
            }
        }>
            Создать
        </Button>
        </Container>
    );
}

export default CreateInitiatives;
