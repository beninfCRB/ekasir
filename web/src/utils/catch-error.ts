export const catchError = (error: any, message: any) => {
  if (error.status === 422 && Array.isArray(error.response.data.message)) {
    return error.response.data.message.map((v: any) => message.error(v.msg))
  } else {
    return message.error(error.response.data.message)
  }
}