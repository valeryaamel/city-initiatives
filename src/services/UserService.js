import {supabase} from "../persistence/Supabase";

export const IsAuthenticated = async () => {
    const {data, error} = await supabase.auth.getUser();

    return data.user !== null;
}

export const Logout = async () => {
    const {data, error} = await supabase.auth.signOut();
}

export const GetUser = async () => {
    const {data: userData} = await supabase.auth.getUser();

    const {data: profileData} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.user.id)
        .single()

    const {data: roleData} = await supabase
        .from('roles')
        .select('*')
        .eq('id', profileData.role_id)
        .single()

    return {
        id: profileData.id,
        username: profileData.username,
        email: userData.user.email,
        role: roleData.name
    }

}