import { validationResult } from "express-validator";
import { prisma } from "../utils/prisma.util.js";

export const getProducts = async (req, res, next) => {
  try {
    const data = await prisma.product.findMany()

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

    const { name, price } = req.body

    const data = await prisma.product.create({
      data: {
        name,
        price
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

    const { name, price } = req.body

    const data = await prisma.product.update({
      where: {
        id: req.params.id
      },
      data: {
        name,
        price
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