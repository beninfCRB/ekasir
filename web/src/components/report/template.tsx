import { Empty } from 'antd'
import DescriptionSelling from '../selling/description'
import { sellingType } from '../selling/types'
import moment from 'moment'
import { currency } from '../../utils/rupiah'

export default function TemplateReport({ data }: { data: sellingType}) {
  return (
    <div
      style={{
        marginLeft: '5rem',
        marginRight: '5rem',
        color: 'black',
        backgroundColor: 'white',
        width: '210mm',
        height: '297mm'
      }}
    >
      {data ? (
        <div>
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            LAPORAN PENJUALAN
          </div>
          <div style={{ textAlign: 'center' }}>
            <p>Tanggal: {moment(data?.createdAt).format('DD/MM/YYYY')}</p>
            <p>Kode Penjualan: {data.code}</p>
          </div>
          <DescriptionSelling data={data} />
          <table className='mt-4' style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Nama Item</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Jumlah</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Harga</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data.selling_item?.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.stock?.product?.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.amount}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{currency(Number(item.price))}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{currency(Number(item.total))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <p>Total: {currency(Number(data.grandTotal))}</p>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </div>
  )
}
