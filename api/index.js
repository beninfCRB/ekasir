import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import productRoute from './src/routes/product.route.js'
import authRoute from './src/routes/auth.route.js'
import bodyParser from 'body-parser'

const app = express()
let port = Number(process.env.APP_PORT)
const url = process.env.APP_URL
const url_web = process.env.APP_URL_WEB

if (!port) port = 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: url_web ? url_web : '*',
  credentials: true
}))

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('E-Kasir API')
})

app.use('/api/v1',
  authRoute,
  productRoute,
)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({ message: err.message })
})


app.all("*", (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` })
})

console.log(`Server is runnning at ${url}:${port}`)

app.listen(port)