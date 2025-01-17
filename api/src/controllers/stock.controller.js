import { validationResult } from "express-validator";
import moment from 'moment';
import { prisma } from "../utils/prisma.util.js";
import { getCurrentUser } from "../utils/user.js";

export const getStocks = async (req, res, next) => {
  try {
    const data = await prisma.stock.findMany({
      include: {
        product: true
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const getStock = async (req, res, next) => {
  try {
    const data = await prisma.stock.findFirst({
      where: {
        id: req.params.id
      },
      include: {
        product: true
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const createStock = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const { code, productId, amount, expiredAt } = req.body

    const userId = (await getCurrentUser(req)).id

    const data = await prisma.stock.create({
      data: {
        code,
        productId,
        amount,
        expiredAt,
        createdBy: userId,
        updatedBy: userId
      }
    })

    res.status(201).json({ data, message: 'Data berhasil dibuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const updateStock = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const { code, productId, amount, expiredAt } = req.body

    const userId = (await getCurrentUser(req)).id

    const data = await prisma.stock.update({
      where: {
        id: req.params.id
      },
      data: {
        code,
        productId,
        amount,
        expiredAt,
        updatedBy: userId
      }
    })

    res.status(201).json({ data, message: 'Data berhasil diubah' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const deleteStock = async (req, res, next) => {
  try {
    const data = await prisma.stock.delete({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dihapus' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}