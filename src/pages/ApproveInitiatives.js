import {useEffect, useState} from "react";
import {getUnapprovedInitiatives} from "../services/InitiativeService";
import {GetUser, getUserId} from "../services/UserService";

function ApproveInitiatives() {

    const [initiatives, setInitiatives] = useState([])
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        GetUser().then((data) => {
            if (data.role === 1 || data.role === 2) {
                setAdmin(true)
            }
        })
        getUnapprovedInitiatives()
            .then((data) => {
                setInitiatives(data)
            })
    }, [])

    if (!admin) return

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

export default ApproveInitiatives;