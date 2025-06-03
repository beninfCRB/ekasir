import { validationResult } from "express-validator";
import { PREFIX } from "../constants/code.constant.js";
import { prisma } from "../utils/prisma.util.js";
import { getCurrentUser } from "../utils/user.js";
import moment from "moment";

export const getCategories = async (req, res, next) => {
  try {
    const data = await prisma.category.findMany();

    return res.status(200).json({ data, message: "Data berhasil dimuat" });
  } catch (error) {
    console.log(`[ ${moment().format("DD/MM/YYYY HH:mm:ss")} ] ${error}`);
    return res.status(500).json({ data: null, message: "Gagal!!" });
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const data = await prisma.category.findFirst({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ data, message: "Data berhasil dimuat" });
  } catch (error) {
    console.log(`[ ${moment().format("DD/MM/YYYY HH:mm:ss")} ] ${error}`);
    return res.status(500).json({ data: null, message: "Gagal!!" });
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({ data: null, message: errors.array() });

    const { name, desc } = req.body;

    const code = PREFIX.CATEGORY + new Date().getTime().toString();
    const userId = (await getCurrentUser(req)).id;

    const data = await prisma.category.create({
      data: {
        code,
        name,
        desc,
        createdBy: userId,
        updatedBy: userId,
      },
    });

    return res.status(201).json({ data, message: "Data berhasil dibuat" });
  } catch (error) {
    console.log(`[ ${moment().format("DD/MM/YYYY HH:mm:ss")} ] ${error}`);
    return res.status(500).json({ data: null, message: "Gagal!!" });
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({ data: null, message: errors.array() });

    const { name, desc } = req.body;

    const userId = (await getCurrentUser(req)).id;

    const data = await prisma.category.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        desc,
        updatedBy: userId,
      },
    });

    return res.status(201).json({ data, message: "Data berhasil diubah" });
  } catch (error) {
    console.log(`[ ${moment().format("DD/MM/YYYY HH:mm:ss")} ] ${error}`);
    return res.status(500).json({ data: null, message: "Gagal!!" });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const data = await prisma.category.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ data, message: "Data berhasil dihapus" });
  } catch (error) {
    console.log(`[ ${moment().format("DD/MM/YYYY HH:mm:ss")} ] ${error}`);
    return res.status(500).json({ data: null, message: "Gagal!!" });
  }
};
