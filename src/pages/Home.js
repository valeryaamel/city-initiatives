function Home(){
    return (
        <div>
            <title>City Initiatives</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
            <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <h1>Добро пожаловать на портал городских инициатив</h1>
                    <p>Назначение портала</p>

                    <h2>Последние проекты</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <img src="https://via.placeholder.com/350x200" className="card-img-top"
                                     alt="Initiative 1"/>
                                <div className="card-body">
                                    <h5 className="card-title">Инициатива 1</h5>
                                    <p className="card-text">Описание</p>
                                    <a href="#" className="btn btn-primary">Подробнее</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <img src="https://via.placeholder.com/350x200" className="card-img-top"
                                     alt="Initiative 2"/>
                                <div className="card-body">
                                    <h5 className="card-title">Инициатива 2</h5>
                                    <p className="card-text">Описание</p>
                                    <a href="#" className="btn btn-primary">Подробнее</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <img src="https://via.placeholder.com/350x200" className="card-img-top"
                                     alt="Initiative 3"/>
                                <div className="card-body">
                                    <h5 className="card-title">Инициатива 3</h5>
                                    <p className="card-text">Описание</p>
                                    <a href="#" className="btn btn-primary">Подробнее</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <img src="https://via.placeholder.com/350x200" className="card-img-top"
                                     alt="Initiative 4"/>
                                <div className="card-body">
                                    <h5 className="card-title">Инициатива 4</h5>
                                    <p className="card-text">Описание</p>
                                    <a href="#" className="btn btn-primary">Подробнее</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <footer className="bg-primary text-white text-center py-3">
            <p>Городские инициативы &copy; 2023</p>
            </footer>
        </div>
        )
}

export default Home;