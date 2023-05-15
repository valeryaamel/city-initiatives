import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUsersInitiatives} from "../services/InitiativeService";

function UserInitiatives() {
    const location = useLocation();
    const path = location.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1);

    const [initiatives, setInitiatives] = useState([])

    useEffect(() => {
        getUsersInitiatives(id).then((data) => {
            setInitiatives(data)
            console.log(data)
        })
    }, [])

    return(
        <div>
            <div className="card-grid">
                {initiatives.map((item) => (
                    <a href={`/info/${item.id}`} className="user-card" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default UserInitiatives;