import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const getCurrentUser = (req) => {
  let token = req.headers['authorization']

  if (!token) {
    token = req.cookies['access-token']
  }

  if (typeof token === 'string' && token.startsWith('Bearer ')) {
    token = token.substring(7)
  }

  return jwt.verify(token, process.env.ACCESS_KEY)
}