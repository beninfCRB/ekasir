import { validationResult } from "express-validator";
import { PREFIX } from "../constants/code.constant.js";
import { prisma } from "../utils/prisma.util.js";
import { getCurrentUser } from "../utils/user.js";

export const getCategorys = async (req, res, next) => {
  try {
    const data = await prisma.category.findMany()

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const getCategory = async (req, res, next) => {
  try {
    const data = await prisma.category.findFirst({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const createCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const { name, desc } = req.body

    const code = PREFIX.CATEGORY + new Date().getTime().toString().substring(0, 4)
    const userId = (await getCurrentUser(req)).id

    const data = await prisma.category.create({
      data: {
        code,
        name,
        desc,
        createdBy: userId,
        updatedBy: userId
      }
    })

    res.status(201).json({ data, message: 'Data berhasil dibuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const { name, desc } = req.body

    const userId = await getCurrentUser(req)

    const data = await prisma.category.update({
      where: {
        id: req.params.id
      },
      data: {
        name,
        desc,
        updatedBy: userId
      }
    })

    res.status(201).json({ data, message: 'Data berhasil diubah' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const deleteCategory = async (req, res, next) => {
  try {
    const data = await prisma.category.delete({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}