import {useState} from "react";
import {SignUp} from "../services/UserService";

function Registration(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async () => {
        await SignUp({
            email: email,
            password: password
        });
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
                                <form>
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>)
}

export default Registration;