//const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;
const url = "https://api.cloudinary.com/v1_1/dac9jlztu/image/upload"

interface UploadImageResponse {
    url?: string;
    error?: string;
}

const uploadImage = async (image: File): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "class_gym");

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        const data = await response.json();

       
        if (data.url) {
            return { url: data.url };
        } else {
            return { error: data.error || "Lỗi không xác định từ Cloudinary" };
        }

    } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
        return { error: "Lỗi khi upload ảnh" };
    }
};

export default uploadImage;
