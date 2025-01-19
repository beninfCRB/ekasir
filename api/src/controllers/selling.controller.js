import { validationResult } from "express-validator";
import { prisma } from "../utils/prisma.util.js";
import { PREFIX } from "../constants/code.constant.js";
import { getCurrentUser } from "../utils/user.js";
import moment from 'moment'

export const getSellings = async (req, res, next) => {
  try {
    const data = await prisma.selling.findMany()

    return res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const getSelling = async (req, res, next) => {
  try {
    const data = await prisma.selling.findFirst({
      where: {
        id: req.params.id
      }
    })

   return res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const createSelling = async (req, res, next) => {
  try {
    const code = PREFIX.SELLING + new Date().getTime().toString()
    const userId = (await getCurrentUser(req)).id;

    const data = await prisma.selling.create({
      data: {
        code,
        createdBy: userId,
        updatedBy: userId
      }
    })

    console.log(data);

    return res.status(201).json({ data, message: 'Data berhasil dibuat' });
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' });
  }
};

export const updateSelling = async (req, res, next) => {
  try {
    return await prisma.$transaction(async (model) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(422).json({ data: null, message: errors.array() })

      const { cashPrice } = req.body

      const userId = (await getCurrentUser(req)).id

      const exist = await model.selling.findFirst({
        where: {
          id: req.params.id
        }
      })

      if (!exist) return res.status(500).json({ data: null, message: 'Data penjualan tidak ditemukan' })

      if (exist.grandTotal > cashPrice) return res.status(500).json({ data: null, message: 'Uang tunai tidak cukup' })

      const returnPrice = cashPrice - exist.grandTotal

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

      return res.status(201).json({ data, message: 'Data berhasil diubah' })
    })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const deleteSelling = async (req, res, next) => {
  try {
    return await prisma.$transaction(async (model) => {
      const selling = await model.selling.findFirst({
        where: {
          id
        }
      })

      if (selling.cashPrice > 0 && selling.returnPrice >= 0) return res.status(500).json({ data: null, message: 'Transaksi penjualan sudah selesai' })

      const data = await model.selling.delete({
        where: {
          id: req.params.id
        }
      })

     return res.status(200).json({ data, message: 'Data berhasil dihapus' })
    })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}