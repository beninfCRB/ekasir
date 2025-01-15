import 'dotenv/config'

const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "7", 10)
export const accessTokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: process.env.NODE_ENV === 'production',
  secure: true,
  sameSite: 'Lax',
  path: '/'
};