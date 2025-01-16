import bcrypt from 'bcryptjs'

export const passwordHash = (plainPassword) => {
  const hash = bcrypt.hashSync(plainPassword, 10)
  return hash
}

export const comparePassword = (plainPassword, passwordHash) => {
  const compared = bcrypt.compareSync(plainPassword, passwordHash)
  return compared
}