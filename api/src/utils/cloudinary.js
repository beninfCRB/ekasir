import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'
import moment from 'moment'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
})

export const cloudinaryUpload = async (file) => {
  let data = { imageId: undefined, imageUrl: undefined }

  if (file) {
    try {
      data = await cloudinary.uploader.upload(
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
  if (!id) return
  try {
    await cloudinary.uploader.destroy(id)
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`)
    throw error
  }
}

export const cloudinaryReUpload = async (id, file) => {
  let data = { imageId: undefined, imageUrl: undefined }
  
  if (file) {
    try {
      if (id) {
        await cloudinaryDelete(id)
      }

      data = await cloudinary.uploader.upload(
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