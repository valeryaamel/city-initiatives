import {useEffect, useState} from "react";
import {getFourLastInitiatives} from "../services/InitiativeService";
import './styles/initiatives.css';

function Home(){
    const [initiatives, setInitiatives] = useState([]);

    useEffect(() => {
        getFourLastInitiatives()
            .then((data) => {setInitiatives(data)})
    }, [])

    return (
        <div>
            <title>City Initiatives</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
            <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <h1 className="text-center">Добро пожаловать на портал городских инициатив</h1>
                    <br/>
                    <p className="text-center" style={{fontWeight: 'bold'}}>Помогаем Волгограду развиваться усилиями самих горожан</p>
                    <br/>
                    <p className="text-center">Мы помогаем людям создавать общий образ будущего и объединять усилия
                        для его приближения.</p>
                    <h2 className="text-center">Последние проекты</h2>

                    <div className="card-grid">
                        {initiatives.map((item) => (
                            <div className="card" key={item.id}>
                                <img src={item.image} alt={item.name} />
                                <h2>{item.name}</h2>
                                <a href={`/info/${item.id}`} className="btn btn-primary">Подробнее</a>
                            </div>
                        ))}
                    </div>
                    <h1 className="text-center">Контакты:</h1>
                    <p className="text-center" style={{fontSize: 18}}>Валерия Мельникова +7 999 888 7766</p>
                    <p className="text-center" style={{color: 'blue', fontSize: 18}}>volgograd.initiatives@mail.ru</p>
                </div>
            </div>
            </div>

            <footer className="bg-primary text-white text-center py-3">
            <p >Городские инициативы &copy; 2023</p>
            </footer>
        </div>
        )
}

export default Home;