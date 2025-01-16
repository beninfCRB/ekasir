import { validationResult } from "express-validator";
import { prisma } from "../utils/prisma.util.js";
import { PREFIX } from "../constants/code.constant.js";
import { getCurrentUser } from "../utils/user.js";

export const getSellingItems = async (req, res, next) => {
  try {
    const data = await prisma.selling_item.findMany()

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const getSellingItem = async (req, res, next) => {
  try {
    const data = await prisma.selling_item.findFirst({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const createSellingItem = async (req, res, next) => {
  try {
    return await prisma.$transaction(async (model) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

      const { sellingId, code, amount } = req.body

      const codeSellingItem = PREFIX.SELLING_ITEM + new Date().getTime().toString().substring(0, 4)
      const userId = (await getCurrentUser(req)).id

      const stock = await model.stock.findFirst({
        where: {
          code
        },
        include: {
          product: true
        }
      })

      if (!stock) res.status(500).json({ data: null, message: 'Data penjualan tidak ditemukan' })

      if (amount > stock.amount) res.status(500).json({ data: null, message: 'penjualan tidak cukup' })

      const tax = await model.tax.findFirst({
        orderBy: {
          createdAt: 'desc'
        }
      })

      if (!tax) res.status(500).json({ data: null, message: 'Data pajak tidak ditemukan' })

      const selling = await model.selling.findFirst({
        where: {
          id: sellingId
        }
      })

      if (!selling) res.status(500).json({ data: null, message: 'Data penjualan tidak ditemukan' })

      const sellingItemExists = await model.selling_item.findMany({
        where: {
          sellingId
        },
        select: {
          price: true
        }
      })

      const price = sellingItemExists.length > 0 ? sellingItemExists.reduce((acc, curr) => acc + curr.price, 0) : 0;
      const total = price * amount
      const taxPrice = (price * tax.percent) / 100
      const grandtotal = total + taxPrice

      const input = {
        taxId: tax.id,
        taxPrice,
        grandtotal
      }

      const inputItem = {
        sellingId,
        amount,
        price,
        total,
        code: codeSellingItem,
        stockId: stock.id,
      }

      const data = model.selling_item.create({
        data: {
          ...inputItem,
          createdBy: userId,
          updatedBy: userId
        }
      })

      if (data) {
        await model.selling.update({
          where: {
            id: selling.id
          },
          data: {
            ...input
          }
        })
      }

      res.status(201).json({ data, message: 'Data berhasil dibuat' })
    })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const deleteSellingItem = async (req, res, next) => {
  try {
    const data = await prisma.selling_item.delete({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}