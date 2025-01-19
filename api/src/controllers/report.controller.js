import moment from "moment"
import puppeteer from 'puppeteer'
import { prisma } from "../utils/prisma.util.js"

export const reportSelling = async (req, res, next) => {
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

    if(!data.cashPrice) return res.status(500).json({ message: 'Data tidak ditemukan' })

    return res.status(200).json({ data, message: 'Data berhasil dimuat' })
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`);
    return res.status(500).json({ data: null, message: 'Gagal!!' })
  }
}

export const reportGeneratePdf = async (req, res) => {
  let browser = null;
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

    if (!data) {
      return res.status(404).json({ message: 'Data tidak ditemukan' })
    }

    browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0)

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(value)
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 40px;
              color: black;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h2 {
              margin-bottom: 15px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid black;
              padding: 10px;
              text-align: left;
            }
            th {
              background-color: #f8f9fa;
            }
            .total {
              text-align: right;
              margin-top: 30px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>LAPORAN PENJUALAN</h2>
            <p>Tanggal: ${moment(data.createdAt).format('DD/MM/YYYY')}</p>
            <p>Kode Penjualan: ${data.code}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Nama Item</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${data.selling_item.map(item => `
                <tr>
                  <td>${item.stock.product.name}</td>
                  <td style="text-align: center">${item.amount}</td>
                  <td style="text-align: right">${formatCurrency(item.price)}</td>
                  <td style="text-align: right">${formatCurrency(item.total)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total">
            <p>Total: ${formatCurrency(data.grandTotal)}</p>
          </div>
        </body>
      </html>
    `

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    })
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      preferCSSPageSize: true
    })

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=laporan-${data.code}.pdf`)
    res.setHeader('Content-Length', pdf.length)
    
    return res.end(pdf)
  } catch (error) {
    console.log(`[ ${moment().format('DD/MM/YYYY HH:mm:ss')} ] ${error}`)
    return res.status(500).json({ message: 'Gagal generate PDF!' })
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}