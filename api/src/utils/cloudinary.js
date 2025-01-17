import { v2 } from 'cloudinary'
import 'dotenv/config'
import moment from 'moment'

const cloud = v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
})

export const cloudinaryUpload = async (file) => {

  let data = { imageId: undefined, imageUrl: undefined }

  if (file) {

    try {
      data = await cloud.uploader.upload(
        file.tempFilePath,
        {
          public_id: new Date().getTime(),
          folder: 'ekasir'
        }
      )
    } catch (error) {
      console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`)
      throw error
    }
  }

  return { imageId: data.public_id, imageUrl: data.secure_url }
}

export const cloudinaryDelete = async (id) => {
  await cloud.uploader.destroy(id)
}

export const cloudinaryReUpload = async (id, file) => {

  let data = { imageId: undefined, imageUrl: undefined }
  if (file) {

    try {

      if (id) {
        await cloudinaryDelete(id)
      }

      data = await cloud.uploader.upload(
        file.tempFilePath,
        {
          public_id: new Date().getTime(),
          folder: 'ekasir'
        }
      )

    } catch (error) {
      console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`)
      throw error
    }

  }

  return { imageId: data.public_id, imageUrl: data.secure_url }
}