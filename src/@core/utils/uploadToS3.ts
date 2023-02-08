import S3Services from "src/services/s3.service"

const uploadToS3 = async (file:any) => {
  
  const formData = new FormData()
 
  formData.append("file", file)

  const { data } = await S3Services.upload(formData)

  console.log(data , "utlitiesssss")

  return data

}

export { uploadToS3 }