import {useEffect, useState} from "react";
import {GetUser, Logout} from "../services/UserService";
import {useNavigate} from "react-router-dom";
import {supabase} from "../persistence/Supabase";

function Profile(){
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(false);
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        GetUser().then(data => {
            setUser(data)
            if (data.role === 1) {
                setAdmin(true)
            }
        })


    }, []);

    const upgradeUser = async () => {
        const e = email.split('@')
        const {d} = await supabase
            .from('profiles')
            .select('*')
            .eq('e', `${e[0]}${e[1]}`)
        const {data, error} = await supabase
            .from('profiles')
            .update({
                role_id: 2
            })
            .eq('e', `${e[0]}${e[1]}`)
        console.log(data)
        console.log(error)
    }

    const handleLogout = () => {
        Logout()
            .then(() => {
                navigate('/')
                window.location.reload()
                window.location.reload()
                window.location.reload()
            })
    }
    console.log(admin)
    return(
        <div>
            <div style={{marginLeft: '25%', marginRight: '25%', marginTop: '2%'}} className="card">
                <div style={{marginLeft: '25%', marginRight: '25%', marginTop: '2%'}} className="card-body">
                    <h5 className="card-title">Профиль</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Имя:</strong> {user.firstName}</li>
                        <li className="list-group-item"><strong>Фамилия:</strong> {user.lastName}</li>
                        <li className="list-group-item"><strong>Отчество:</strong> {user.patronymic}</li>
                        <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                        <li className="list-group-item"><button
                            className="btn btn-primary"
                            onClick={(e) => navigate(`/initiatives/${user.id}`)}
                        >Ваши инициативы</button></li>
                        {
                            admin ?
                                <li className="list-group-item"><button
                                    className="btn btn-primary"
                                    onClick={(e) => navigate(`/initiatives/approve`)}
                                >Подтвердить инициативы</button></li>
                                :
                                <div></div>
                        }
                        {
                            admin ?
                                <li className="list-group-item">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">@</span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Email"
                                               aria-label="Username" aria-describedby="basic-addon1"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}/>
                                    </div>
                                    <button
                                        style={{marginTop: '5px'}}
                                    className="btn btn-primary"
                                    onClick={(e) => upgradeUser()}
                                >Сделать редактором</button></li>
                                :
                                <div></div>
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