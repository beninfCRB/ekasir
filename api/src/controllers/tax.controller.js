import { validationResult } from "express-validator";
import { prisma } from "../utils/prisma.util.js";
import { PREFIX } from "../constants/code.constant.js";
import { getCurrentUser } from "../utils/user.js";
import moment from 'moment'

export const getTaxs = async (req, res, next) => {
  try {
    const data = await prisma.tax.findMany()

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss').toString()} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const getTax = async (req, res, next) => {
  try {
    const data = await prisma.tax.findFirst({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss').toString()} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const createTax = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const { name, percent, desc } = req.body

    const code = PREFIX.TAX + new Date().getTime().toString()
    const userId = (await getCurrentUser(req)).id

    const data = await prisma.tax.create({
      data: {
        code,
        name,
        percent,
        desc,
        createdBy: userId,
        updatedBy: userId
      }
    })

    res.status(201).json({ data, message: 'Data berhasil dibuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss').toString()} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const updateTax = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const { name, percent, desc } = req.body

    const userId = (await getCurrentUser(req)).id

    const data = await prisma.tax.update({
      where: {
        id: req.params.id
      },
      data: {
        name,
        percent,
        desc,
        updatedBy: userId
      }
    })

    res.status(201).json({ data, message: 'Data berhasil diubah' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss').toString()} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const deleteTax = async (req, res, next) => {
  try {
    const data = await prisma.tax.delete({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dihapus' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss').toString()} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}