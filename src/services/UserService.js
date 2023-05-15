import {supabase} from "../persistence/Supabase";

export const IsAuthenticated = async () => {
    const {data, error} = await supabase.auth.getUser();

    return data.user !== null;
}

export const getUserId = async () => {
    const {data, error} = await supabase
        .auth
        .getUser();

    if (error) {
        return ''
    } else {
        return data.user.id.toString()
    }
}

export const SignUp = async (user) => {
    const {data, error} = await supabase.auth.signUp({
        email: user.email,
        password: user.password
    })
    await addProfile(data.user.id, user)
}

const addProfile = async (id, user) => {
    const e = user.email.split('@')
    const em = `${e[0]}${e[1]}`
    const {data, error} = await supabase
        .from('profiles')
        .update({
            first_name: user.firstName,
            last_name: user.lastName,
            patronymic: user.patronymic,
            e: em
        })
        .eq('id', id)
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


    return {
        id: profileData.id,
        email: userData.user.email,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        patronymic: profileData.patronymic,
        role: profileData.role_id
    }

}