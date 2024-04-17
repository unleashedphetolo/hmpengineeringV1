import React, { useContext } from 'react'
import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Table,
} from 'react-bootstrap'
import ShopContext from '../context/shop/shopContext'
import { Link } from 'react-router-dom'

const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0

  const total = arr.reduce((acc, val) => acc + val, 0)

  return total.toFixed(2)
}
const Cart = () => {
  const { cart, incrementQty, decrementQty, removeCartItem } =
    useContext(ShopContext)

  return (
    <div style={{ minHeight: '75vh' }}>
      <Container>
        <Card style={{ marginTop: 50 }}>
          <Card.Body>
            <Card.Title>Cart ({cart?.length})</Card.Title>
            <Table size='sm' responsive='md'>
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        width={90}
                        style={{ borderRadius: 5 }}
                      />
                    </td>
                    <td>
                      <strong>{item.title}</strong>
                    </td>
                    <td style={{ padding: '10px 100px 0 0' }}>
                      <InputGroup className='mb-3' size='sm'>
                        <Button
                          variant='outline-secondary'
                          id='button-addon1'
                          className='d-flex align-items-center'
                          onClick={() => {
                            if (item.quantity > 1) decrementQty(item.id)
                          }}
                        >
                          <ion-icon
                            style={{ fontSize: 18 }}
                            name='remove-outline'
                          ></ion-icon>
                        </Button>
                        <Form.Control
                          style={{ width: 20 }}
                          type='number'
                          value={item.quantity}
                          aria-label='Example text with button addon'
                          aria-describedby='basic-addon1'
                          disabled
                        />
                        <Button
                          className='d-flex align-items-center'
                          variant='outline-secondary'
                          id='button-addon1'
                          onClick={() => {
                            if (item.quantity < 500) incrementQty(item.id)
                          }}
                        >
                          <ion-icon
                            style={{ fontSize: 18 }}
                            name='add-outline'
                          ></ion-icon>
                        </Button>
                      </InputGroup>
                    </td>
                    <td>R {item.price}</td>
                    <td>
                      <div
                        onClick={() => removeCartItem(item.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <ion-icon name='close-outline'></ion-icon>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {cart.length ? (
              <>
                <div className='d-flex justify-content-end'>
                  <div>
                    <p style={{ fontWeight: '900', fontSize: 30 }}>
                      Total: R{' '}
                      {calculateTotal(
                        cart.map((item) => item.price * item.quantity)
                      )}
                    </p>
                  </div>
                </div>
                <Link
                  type='button'
                  className='btn btn-dark'
                  variant='dark'
                  to='/checkout'
                >
                  Checkout
                </Link>
              </>
            ) : null}
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default Cart
