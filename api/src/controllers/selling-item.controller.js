import { validationResult } from "express-validator";
import { prisma } from "../utils/prisma.util.js";
import { PREFIX } from "../constants/code.constant.js";
import { getCurrentUser } from "../utils/user.js";
import moment from 'moment'

export const getSellingItems = async (req, res, next) => {
  try {
    const { sellingId } = req.query

    if (!sellingId) return res.status(500).json({ data: null, message: 'Head penjualan tidak ditemukan' })

    const data = await prisma.selling_item.findMany({
      where: {
        sellingId: sellingId
      },
      include: {
        stock: {
          include: {
            product: true
          }
        }
      },
      orderBy:{
        createdAt:'desc'
      }
    })

    return res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const getSellingItem = async (req, res, next) => {
  try {
    const data = await prisma.selling_item.findFirst({
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

export const createSellingItem = async (req, res, next) => {
  try {
    return await prisma.$transaction(async (model) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(422).json({ data: null, message: errors.array() })

      const { sellingId, code, amount } = req.body

      const codeSellingItem = PREFIX.SELLING_ITEM + new Date().getTime().toString()
      const userId = (await getCurrentUser(req)).id

      const stock = await model.stock.findFirst({
        where: {
          code
        },
        include: {
          product: true
        }
      })

      if (!stock) return res.status(500).json({ data: null, message: 'Data stok tidak ditemukan' })

      if (amount > stock.amount) return res.status(500).json({ data: null, message: 'Stok tidak cukup' })

      const tax = await model.tax.findFirst({
        orderBy: {
          createdAt: 'desc'
        }
      })

      if (!tax) return res.status(500).json({ data: null, message: 'Data pajak tidak ditemukan' })

      const selling = await model.selling.findFirst({
        where: {
          id: sellingId
        }
      })

      if (!selling) return res.status(500).json({ data: null, message: 'Data penjualan tidak ditemukan' })

      if (selling.cashPrice > 0 && selling.returnPrice >= 0) return res.status(500).json({ data: null, message: 'Transaksi penjualan sudah selesai' })

      const price = Number(stock.product?.price)
      const total = Number(price * amount)
      const taxPrice = (Number((total * tax.percent)) / 100) + Number(selling.taxPrice)
      const grandTotal = Number(total) + Number(selling.grandTotal) + (Number((total * tax.percent)) / 100)
      const amountUpdate = Number(stock.amount) - Number(amount)

      const input = {
        taxId: tax.id,
        taxPrice,
        grandTotal
      }

      const inputItem = {
        sellingId,
        amount,
        price,
        total,
        code: codeSellingItem,
        stockId: stock.id,
      }

      const data = await model.selling_item.create({
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
            ...input,
            updatedBy: userId
          }
        })

        await model.stock.update({
          where: {
            id: stock.id
          },
          data: {
            amount: amountUpdate,
            updatedBy: userId
          }
        })
      }

      return res.status(201).json({ data, message: 'Data berhasil dibuat' })
    })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const deleteSellingItem = async (req, res, next) => {
  try {
    return await prisma.$transaction(async (model) => {
      const userId = (await getCurrentUser(req)).id

      const sellingItem = await model.selling_item.findFirst({
        where: {
          id: req.id
        },
        include: {
          selling: {
            include: {
              tax: true
            }
          },
          stock: true
        }
      })

      const data = await model.selling_item.delete({
        where: {
          id: sellingItem.id
        }
      })

      if (data) {
        const taxPriceRemoved = Number((sellingItem.selling?.tax?.percent * sellingItem.total) / 100)
        const taxPrice = Number(sellingItem.selling?.taxPrice) - taxPriceRemoved
        const grandTotal = Number(sellingItem.selling?.grandTotal) - (Number(sellingItem.total) + (taxPriceRemoved))
        const amount = Number(sellingItem.stock?.amount) + Number(sellingItem.amount)

        await model.selling.update({
          where: {
            id: sellingItem.sellingId
          },
          data: {
            taxPrice,
            grandTotal,
            updatedBy: userId
          }
        })

        await model.stock.update({
          where: {
            id: sellingItem.stockId
          },
          data: {
            amount,
            updatedBy: userId
          }
        })
      }

      return res.status(200).json({ data, message: 'Data berhasil dihapus' })
    })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}