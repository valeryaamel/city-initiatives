import {supabase} from "../persistence/Supabase";

export const getInitiatives = async () => {
    const {data, error} = await supabase
        .from('initiatives')
        .select('id, name');

    if (error){
        throw new Error(error.message)
    }

    let initiatives = []

    for (let i = 0; i < data.length; i++) {
        const {data: image, error: imagesError} = await supabase
            .from('initiatives_images')
            .select('image_url')
            .eq('initiative_id', data[i].id)
            .limit(1)

        if (imagesError) {
            throw new Error(imagesError.message)
        } else {
            initiatives.push({
                id: data[i].id,
                name: data[i].name,
                image: image.map(x => x.image_url)[0]
            })
        }
    }

    return initiatives;
}

export const getInitiative = async (id) => {
    const {data, error} = await supabase
        .from('initiatives')
        .select('*')
        .eq('id', id)
        .single()

    if (error){
        throw new Error(error.message)
    }

    const {data: images, error: imagesError} = await supabase
        .from('initiatives_images')
        .select('image_url')
        .eq('initiative_id', data.id)

    if (imagesError){
        throw new Error(imagesError.message)
    }

    return {
        id: data.id,
        name: data.name,
        x: data.point_x,
        y: data.point_y,
        images: images.map(x => x.image_url)
    };
}