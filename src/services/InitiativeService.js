import {supabase} from "../persistence/Supabase";
import {GetUser} from "./UserService";

export const getInitiatives = async () => {
    const {data, error} = await supabase
        .from('initiatives')
        .select('id, name, point_x, point_y, initiatives_images ( image_url )')
        .eq('status_id', 2);

    if (error){
        throw new Error(error.message)
    }

    return data.map(x => ({
        id: x.id,
        name: x.name,
        x: x.point_x,
        y: x.point_y,
        image: x.initiatives_images.map(i => i.image_url)[0]
    }));
}

export const getUnapprovedInitiatives = async () => {
    const {data, error} = await supabase
        .from('initiatives')
        .select('id, name, point_x, point_y, initiatives_images ( image_url )')
        .eq('status_id', 1)

    if (error) {
        throw new Error(error.message)
    }

    return data.map(x => ({
        id: x.id,
        name: x.name,
        x: x.point_x,
        y: x.point_y,
        image: x.initiatives_images.map(i => i.image_url)[0]
    }));
}

export const getInitiative = async (id) => {
    const {data, error} = await supabase
        .from('initiatives')
        .select('id, name, description, point_x, point_y, owner, status_id, initiatives_images ( image_url )')
        .eq('id', id)
        .single()

    if (error){
        throw new Error(error.message)
    }

    return {
        id: data.id,
        name: data.name,
        description: data.description,
        x: data.point_x,
        y: data.point_y,
        owner: data.owner,
        status: data.status_id,
        images: data.initiatives_images.map(x => x.image_url)
    };
}

export const getEditableInitiative = async (id) => {
    const {data, error} = await supabase
        .from('initiatives')
        .select('name, description, point_x, point_y, owner, initiatives_images (id, image_url)')
        .eq('id', id)
        .single()

    if (error){
        throw new Error(error.message)
    }

    return {
        id: data.id,
        name: data.name,
        description: data.description,
        x: data.point_x,
        y: data.point_y,
        owner: data.owner,
        images: data.initiatives_images
    };
}

export const getFourLastInitiatives = async () => {
    const {data, error} = await supabase
        .from('initiatives')
        .select('id, name, initiatives_images ( image_url )')
        .order('created_at', {ascending: false})
        .limit(4)
        .eq('status_id', 2);


    if (error){
        throw new Error(error.message)
    }

    return data.map(x => ({
        id: x.id,
        name: x.name,
        image: x.initiatives_images.map(i => i.image_url)[0]
    }));
}

export const getUsersInitiatives = async (id) => {
    const owner = await GetUser();
    const {data, error} = await supabase
        .from('initiatives')
        .select('id, name, initiatives_images ( image_url )')
        .order('created_at', {ascending: false})
        .eq('owner', owner.id)

    return data.map(x => ({
        id: x.id,
        name: x.name,
        image: x.initiatives_images.map(i => i.image_url)[0]
    }));
}

export const approveInitiative = async (id) => {
    console.log(id)
    await supabase
        .from('initiatives')
        .update({
            status_id: 2
        })
        .eq('id', id)
}

export const declineInitiative = async (id) => {
    await supabase
        .from('initiatives')
        .update({
            status_id: 3
        })
        .eq('id', id)
}