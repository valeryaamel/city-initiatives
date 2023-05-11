import {supabase} from "../persistence/Supabase";
import {useEffect, useState} from "react";

function Profile(){
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getSession = async () => {
            const user = (await supabase.auth.getUser()).data.user;
            const profile = (await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()).data;
            setUser(user);
            setProfile(profile);
            setIsLoaded(true);
        };
        getSession();
    }, []);

    if (!isLoaded) return ;

    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Profile</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Username:</strong> {profile.username}</li>
                    <li className="list-group-item"><strong>First Name:</strong> user.firstname</li>
                    <li className="list-group-item"><strong>Last Name:</strong> Lastname</li>
                    <li className="list-group-item"><strong>Patronymic:</strong> Patronymic</li>
                    <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile;