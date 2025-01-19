import { validationResult } from "express-validator";
import moment from 'moment';
import { PREFIX } from "../constants/code.constant.js";
import { cloudinaryDelete, cloudinaryReUpload, cloudinaryUpload } from "../utils/cloudinary.js";
import { prisma } from "../utils/prisma.util.js";
import { getCurrentUser } from "../utils/user.js";

export const getProducts = async (req, res, next) => {
  try {
    const data = await prisma.product.findMany({
      include: {
        category: true,
        stock: true
      }
    })

   return res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
   return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const getProduct = async (req, res, next) => {
  try {
    const data = await prisma.product.findFirst({
      where: {
        id: req.params.id
      },
      include: {
        category: true
      }
    })

   return res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const createProduct = async (req, res, next) => {
  try {
    return await prisma.$transaction(async (model) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(422).json({ data: null, message: errors.array() })

      const { name, price, categoryId } = req.body

      const code = PREFIX.PRODUCT + new Date().getTime().toString()
      const userId = (await getCurrentUser(req)).id

      const { imageId, imageUrl } = await cloudinaryUpload(req.files.file)

      const data = await model.product.create({
        data: {
          code,
          name,
          price,
          categoryId,
          imageId,
          imageUrl,
          createdBy: userId,
          updatedBy: userId
        }
      })


     return res.status(201).json({ data, message: 'Data berhasil dibuat' })
    })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`)
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    return await prisma.$transaction(async (model) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(422).json({ data: null, message: errors.array() })

      const { name, price, categoryId } = req.body

      const userId = (await getCurrentUser(req)).id

      const exist = await model.product.findFirst({
        where: {
          id: req.params.id
        }
      })

      const { imageId, imageUrl } = await cloudinaryReUpload(exist.imageId, req.files.file)

      const data = await model.product.update({
        where: {
          id: req.params.id
        },
        data: {
          name,
          price,
          categoryId,
          imageId,
          imageUrl,
          updatedBy: userId
        }
      })

      if (!data) await cloudinaryDelete(exist.imageId)

     return res.status(201).json({ data, message: 'Data berhasil diubah' })
    })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
   return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    return await prisma.$transaction(async (model) => {
      const data = await model.product.delete({
        where: {
          id: req.params.id
        }
      })

      if (data) {
        await cloudinaryDelete(data.imageId)
      }

     return res.status(200).json({ data, message: 'Data berhasil dihapus' })
    })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}