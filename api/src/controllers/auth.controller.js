import { validationResult } from "express-validator";
import { accessTokenOptions } from "../utils/cookie.util.js";
import { comparePassword, passwordHash } from "../utils/password.util.js";
import { prisma } from "../utils/prisma.util.js";
import { generateAccessToken } from "../utils/token.util.js";
import moment from 'moment'

export const signupController = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const { email, username, password } = req.body;

    const exist = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (exist) res.status(404).json({ data: null, message: 'Email atau Username sudah ada!' })

    const hashPwd = passwordHash(password)

    const data = await prisma.user.create({
      data: {
        email,
        username,
        role: "user",
        password: hashPwd
      }
    })

    res.status(201).json({ data, message: 'Akun berhasil dibuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss').toString()} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const signinController = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(422).json({ data: null, message: errors.array() })

    const { email, password } = req.body;

    const exist = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!exist) res.status(401).json({ data: null, message: 'Email atau Username tidak ditemukan!' })

    const validPwd = comparePassword(password, exist.password)

    if (!validPwd) res.status(401).json({ data: null, message: 'Kata sandi salah!' })

    const accessToken = generateAccessToken(exist)

    delete exist.password

    res.cookie("access-token", accessToken, { ...accessTokenOptions, sameSite: 'none' })

    res.status(201).json({ data: exist, message: 'Sign In berhasil' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss').toString()} ] ${error}`);
    res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const signoutController = async (req, res, next) => {
  try {
    res.clearCookie("access-token", accessTokenOptions)
    res.status(200).json({ data: null, message: "Sign out berhasil" })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss').toString()} ] ${error}`);
    res.status(500).json({ data: null, message: "Sign out gagal" })
  }
};