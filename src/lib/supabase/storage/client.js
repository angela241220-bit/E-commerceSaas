import { createSupabaseClient } from "../client";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
function getStorage() {
    const { storage } = createSupabaseClient();
    return storage;
}
export const uploadImage = async ({ file, bucket, folder }) => {
    if (!bucket) {
        return {
            imageUrl: "",
            error: "Supabase storage bucket is not configured",
        };
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return {
            imageUrl: "",
            error: "Supabase URL is not configured",
        };
    }
    const fileName = file.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
    const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;
    try {
        file = await imageCompression(file, {
            maxSizeMB: 1,
        });
    }
    catch (error) {
        console.error(error);
        return { imageUrl: "", error: "Image compression failed" };
    }
    const storage = getStorage();
    const { data, error } = await storage.from(bucket).upload(path, file);
    if (error) {
        console.error("Supabase image upload failed", {
            bucket,
            path,
            message: error.message,
            statusCode: error.statusCode,
        });
        return {
            imageUrl: "",
            error: error.message || "Image upload failed",
        };
    }
    const { data: publicUrlData } = storage
        .from(bucket)
        .getPublicUrl(data?.path || path);
    const imageUrl = publicUrlData.publicUrl;
    return { imageUrl, error: "" };
};
export const deleteImage = async (imageUrl) => {
    const bucketAndPathString = imageUrl.split("/storage/v1/object/public/")[1];
    const firstSlashIndex = bucketAndPathString.indexOf("/");
    const bucket = bucketAndPathString.slice(0, firstSlashIndex);
    const path = bucketAndPathString.slice(firstSlashIndex + 1);
    const storage = getStorage();
    const { data, error } = await storage.from(bucket).remove([path]);
    return { data, error };
};
