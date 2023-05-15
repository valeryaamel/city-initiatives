import {useEffect, useState} from "react";
import {supabase} from "../persistence/Supabase";
import {useNavigate} from "react-router-dom";
import {GetUser, IsAuthenticated} from "../services/UserService";

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState()

    const navigation = useNavigate();

    useEffect(() => {
        IsAuthenticated().then((data) => {
            if (data) {
                navigation('/profile')
            }
        })
    })

    const handleLogin = async (event) => {
        event.preventDefault()

        const { data, error } = await supabase
            .auth
            .signInWithPassword({ email, password })


        if (error) {
            alert(error.message)
        } else {
            navigation('/')
            window.location.reload()
        }
    }

    return(
        <div>
        <title>Login - City Initiatives</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h4>Login</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email"
                                       className="form-control"
                                       placeholder="Enter email"
                                       name="email"
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password"
                                       className="form-control"
                                       id="password"
                                       placeholder="Enter password"
                                       name="password"
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit"
                                    className="btn btn-primary mt-3"
                                    onClick={handleLogin}
                            >Submit</button>
                            <a href="/register" className="btn btn-outline-primary mt-3 ml-3">Зарегистрироваться</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>);
}

export default Login;