
function Registration(){

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
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" placeholder="Enter name"
                                               name="name"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" className="form-control" id="email"
                                               placeholder="Enter email" name="email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className="form-control" id="password"
                                               placeholder="Enter password" name="password"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirm-password">Confirm Password:</label>
                                        <input type="password" className="form-control" id="confirm-password"
                                               placeholder="Confirm password" name="confirm-password"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>)
}

export default Registration;