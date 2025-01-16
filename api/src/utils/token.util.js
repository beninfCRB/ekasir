import jwt from 'jsonwebtoken'
import 'dotenv/config'

const jwtAccessKey = process.env.ACCESS_KEY
const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRE

export const generateAccessToken = (user) => {
  const token = jwt.sign({ id: user.id, email: user.email }, jwtAccessKey, {
    expiresIn: `${accessTokenExpire}h`,
  })

  return token
}

export const verifyToken = (token) => {
  try {
    const tokenData = jwt.verify(token, jwtAccessKey)
    return tokenData
  } catch (error) {
    throw new ErrorException(ErrorCode.Unauthenticated)
  }
}