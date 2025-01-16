import { validationResult } from "express-validator";
import { prisma } from "../utils/prisma.util.js";
import { PREFIX } from "../constants/code.constant.js";
import { getCurrentUser } from "../utils/user.js";

export const getSellings = async (req, res, next) => {
  try {
    const data = await prisma.selling.findMany()

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const getSelling = async (req, res, next) => {
  try {
    const data = await prisma.selling.findFirst({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const createSelling = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const code = PREFIX.SELLING + new Date().getTime().toString().substring(0, 4)
    const userId = (await getCurrentUser(req)).id

    const data = await prisma.selling.create({
      data: {
        code,
        createdBy: userId,
        updatedBy: userId
      }
    })

    res.status(201).json({ data, message: 'Data berhasil dibuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const updateSelling = async (req, res, next) => {
  try {
    return await prisma.$transaction(async (model) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

      const { cashPrice } = req.body

      const userId = (await getCurrentUser(req)).id

      const exist = await model.selling.findFirst({
        where: {
          id: req.params.id
        }
      })

      if (!exist) res.status(500).json({ data: null, message: 'Data penjualan tidak ditemukan' })

      if (exist.grandtotal > cashPrice) res.status(500).json({ data: null, message: 'Uang tunai tidak cukup' })

      const returnPrice = cashPrice - exist.grandtotal

      const data = await model.selling.update({
        where: {
          id: req.params.id
        },
        data: {
          cashPrice,
          returnPrice,
          updatedBy: userId
        }
      })

      res.status(201).json({ data, message: 'Data berhasil diubah' })
    })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const deleteSelling = async (req, res, next) => {
  try {
    const data = await prisma.selling.delete({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}