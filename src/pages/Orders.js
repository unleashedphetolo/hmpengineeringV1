import React, { useContext, useEffect } from 'react'
import ShopContext from '../context/shop/shopContext'
import AuthContext from '../context/auth/authContext'
import { Card, Container, Table } from 'react-bootstrap'
import Loading from '../components/Loading'

const Orders = () => {
  const { orders, getOrders, orderLoading } = useContext(ShopContext)
  const { user } = useContext(AuthContext)
  useEffect(() => {
    getOrders(user.id)
  }, [])

  return (
    <div style={{ minHeight: '75vh' }}>
      <Container>
        <Card style={{ marginTop: 50 }}>
          <Card.Body>
            <Card.Title>Orders</Card.Title>

            <Table size='sm' responsive='md'>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Ship to</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderLoading ? (
                  <div
                    className='d-flex align-items-center justify-content-center'
                    style={{ height: 200 }}
                  >
                    <Loading />
                  </div>
                ) : (
                  orders &&
                  orders.map((item, index) => (
                    <tr key={item.id}>
                      <td>#{item.orderNumber}</td>
                      <td>
                        <strong>
                          {new Date(item.created_at).toLocaleDateString()}
                        </strong>
                      </td>
                      <td
                      // style={{ padding: '10px 100px 0 0' }}
                      >
                        {item.status}
                      </td>
                      <td
                      // style={{ padding: '10px 100px 0 0' }}
                      >
                        {item.street}, {item.city}, {item.suburb}
                      </td>
                      <td>R {item.total}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default Orders
