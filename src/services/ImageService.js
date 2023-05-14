import {supabase} from "../persistence/Supabase";
import {NewGuid} from "./Helpers/Guid";

export const DeleteImage = async (id) => {
    await supabase
        .from('initiatives_images')
        .delete()
        .eq('id', id)
}

export const UploadImage = async (id, file) => {
    const guid = NewGuid();
    const {data} = await supabase
        .storage
        .from('images')
        .upload(`${id}/${guid}.${file.extension}`, file.data)

    await LinkImage(id, data);
}

const LinkImage = async (id, file) => {
    const {data} = supabase
        .storage
        .from('images')
        .getPublicUrl(file.path)

    await supabase
        .from('initiatives_images')
        .insert({
            initiative_id: id,
            image_url: data.publicUrl
        })
}