import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getInitiatives} from "../services/InitiativeService";
import './styles/initiatives.css';
import {IsAuthenticated} from "../services/UserService";

function Initiatives(){
    const navigate = useNavigate();
    const [initiatives, setInitiatives] = useState([]);
    const [auth, setAuth] = useState(false);

    useEffect(() =>{
        getInitiatives()
            .then((data) => {
                setInitiatives(data)
            })
            .catch((ex) => {
                alert(ex.message)
            })
        IsAuthenticated().then((data) => {setAuth(data)})
    }, [])

    console.log(initiatives)

    return(<div>
        {
            auth ?
                <button onClick={() => navigate('/create')}>
                    Создать
                </button>
                :
                <br/>
        }

        <div className="card-grid">
            {initiatives.map((item) => (
                <a href={`/info/${item.id}`} className="card" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <h2>{item.name}</h2>
                </a>
            ))}
        </div>


    </div>);
}

export default Initiatives;