import { validationResult } from "express-validator";
import { prisma } from "../utils/prisma.util.js";
import { PREFIX } from "../constants/code.constant.js";
import { getCurrentUser } from "../utils/user.js";

export const getProducts = async (req, res, next) => {
  try {
    const data = await prisma.product.findMany({
      include: {
        category: true
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
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

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const { name, price, categoryId } = req.body

    const code = PREFIX.PRODUCT + new Date().getTime().toString().substring(0, 4)
    const userId = (await getCurrentUser(req)).id

    const data = await prisma.product.create({
      data: {
        code,
        name,
        price,
        categoryId,
        createdBy: userId,
        updatedBy: userId
      }
    })

    res.status(201).json({ data, message: 'Data berhasil dibuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const { name, price, categoryId } = req.body

    const userId = (await getCurrentUser(req)).id

    const data = await prisma.product.update({
      where: {
        id: req.params.id
      },
      data: {
        name,
        price,
        categoryId,
        updatedBy: userId
      }
    })

    res.status(201).json({ data, message: 'Data berhasil diubah' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const data = await prisma.product.delete({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}