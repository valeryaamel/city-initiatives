import {useEffect, useState} from "react";
import {GetUser, Logout} from "../services/UserService";
import {useNavigate} from "react-router-dom";
import {getUsersInitiatives} from "../services/InitiativeService";

function Profile(){
    const [user, setUser] = useState({});
    const [usersInitiatives, setUsersInitiatives] = useState([])
    const [hideUsersInitiatives, setHideUsersInitiatives] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        GetUser().then(data => setUser(data))
        getUsersInitiatives().then((data) => setUsersInitiatives(data))
    }, []);

    const handleLogout = () => {
        Logout()
            .then(() => {
                navigate('/')
                window.location.reload()
            })
    }

    return(
        <div>
            <div style={{marginLeft: '25%', marginRight: '25%', marginTop: '2%'}} className="card">
                <div style={{marginLeft: '25%', marginRight: '25%', marginTop: '2%'}} className="card-body">
                    <h5 className="card-title">Profile</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Логин:</strong> {user.username}</li>
                        <li className="list-group-item"><strong>Имя:</strong> user.firstname</li>
                        <li className="list-group-item"><strong>Фамилия:</strong> Lastname</li>
                        <li className="list-group-item"><strong>Отчество:</strong> Patronymic</li>
                        <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                    </ul>
                </div>
            </div>

            <div style={{marginLeft: '25%', marginRight: '25%', marginTop: '2%'}} className="card">
                <div style={{marginLeft: '25%',marginRight: '5%', marginTop: '2%'}} className="card-body">

                    <strong className="card-title">Ваши инициативы </strong>
                    <button onClick={(e) => setHideUsersInitiatives(!hideUsersInitiatives)}
                            className="btn btn-info">{hideUsersInitiatives ? 'Показать' : 'Скрыть'}</button>
                    <ul hidden={hideUsersInitiatives} className="list-group list-group-flush">
                        {
                            usersInitiatives.map(x => (
                                <li style={{marginTop: '3px'}} className="list-group-item" key={x.id}>
                                    <strong>{x.name} </strong>
                                    <button
                                        onClick={(e) => navigate(`/edit/${x.id}`)}
                                        className="btn btn-primary">Редактировать</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>



            <button
                style={{marginLeft: '48%', marginTop: '2%'}}
                className="btn btn-danger"
                onClick={handleLogout}
            >ВЫХОД</button>
        </div>

    )
}

export default Profile;