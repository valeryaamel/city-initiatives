import {useState} from "react";
import {SignUp} from "../services/UserService";
import {useNavigate} from "react-router-dom";

function Registration(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [patronymic, setPatronymic] = useState('')

    const navigate = useNavigate();

    const handleSignUp = async () => {
        await SignUp({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            patronymic: patronymic
        });
        navigate('/')
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                {/*<form>*/}
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter email"
                                            name="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Имя:</label>
                                        <input
                                            className="form-control"
                                            placeholder="Введите имя"
                                            name="firstName"
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Фамилия:</label>
                                        <input
                                            className="form-control"
                                            placeholder="Введите фамилию"
                                            name="lastName"
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Отчество:</label>
                                        <input
                                            className="form-control"
                                            placeholder="Введите отчество"
                                            name="patronymic"
                                            onChange={(e) => setPatronymic(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSignUp}
                                    >Register</button>
                               {/* </form>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>)
}

export default Registration;