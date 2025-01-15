import { prisma } from "../utils/prisma.util.js"
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const isAuthenticated = async (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    token = req.cookies['access-token'];
  }

  if (!token) {
    return next(res.status(403).json({ data: null, message: 'Silahkan sign in untuk mengakses' }));
  }

  if (typeof token === 'string' && token.startsWith('Bearer ')) {
    token = token.substring(7);
  }


  if (!token) {
    return next(res.status(403).json({ data: null, message: 'Token tidak ditemukan' }));
  }


  try {
    const decoded = jwt.verify(token, process.env.ACCESS_KEY);
    if (!decoded) {
      return next(res.status(403).json({ data: null, message: 'Token tidak valid!' }));
    }

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id
      }
    });

    if (!user) {
      return next(res.status(403).json({ data: null, message: 'Silahkan sign in untuk mengakses' }));
    }

    req.user = user
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return next(res.status(500).json({ data: null, message: 'Token tidak valid!' }))
  }
};