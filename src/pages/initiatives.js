import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getInitiatives} from "../services/InitiativeService";
import './styles/initiatives.css';

function Initiatives(){
    const navigate = useNavigate();
    const [initiatives, setInitiatives] = useState([]);

    useEffect(() =>{
        getInitiatives()
            .then((data) => {
                setInitiatives(data)
            })
            .catch((ex) => {
                alert(ex.message)
            })
    }, [])

    console.log(initiatives)

    return(<div>

        <div className="card-grid">
            {initiatives.map((item) => (
                <a href={`/info/${item.id}`} className="card" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <h2>{item.name}</h2>
                </a>
            ))}
        </div>

        <button onClick={() => navigate('/create')}>
            Создать
        </button>
    </div>);
}

export default Initiatives;