import CloudinaryService from "src/services/cloudinary.service"

const uploadToCloudinary = async (file:any): Promise<{ url: string }> => {

    const formData = new FormData()

    formData.append("file", file)
    formData.append("upload_preset", "vbing51p")

    const { data } = await CloudinaryService.upload(formData)

    return data
}

export default uploadToCloudinary