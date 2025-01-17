import { validationResult } from "express-validator"
import { prisma } from "../utils/prisma.util.js"
import moment from "moment"

export const reportSelling = async (req, res, nex) => {
  try {
    const data = await prisma.selling.findFirst({
      where: {
        id: req.params.id
      },
      include: {
        selling_item: {
          include: {
            stock: {
              include: {
                product: true
              }
            }
          }
        },
        tax: true
      }
    })

    res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}