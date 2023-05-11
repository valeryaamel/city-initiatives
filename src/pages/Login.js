import {useState} from "react";
import {supabase} from "../persistence/Supabase";
import {useNavigate, useNavigation} from "react-router-dom";

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigate();
    localStorage.removeItem('user')

    const handleLogin = async (event) => {
        event.preventDefault()

        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            alert(error.message)
        } else {
            const user = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single()
            localStorage.setItem('user', user.data.username);
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
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" name="remember"/> Remember me
                                </label>
                            </div>
                            <button type="submit"
                                    className="btn btn-primary mt-3"
                                    onClick={handleLogin}
                            >Submit</button>
                            <a href="/register" className="btn btn-outline-primary mt-3 ml-3">Register</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer className="bg-primary text-white text-center py-3">
        <p>City Initiatives &copy; 2023</p>
    </footer>

    </div>);
}

export default Login;