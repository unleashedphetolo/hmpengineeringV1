import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import ShopContext from '../context/shop/shopContext'
import AuthContext from '../context/auth/authContext'
import { Link, useNavigate } from 'react-router-dom'
import md5 from 'md5'
import { toast } from 'react-toastify'

const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0

  const total = arr.reduce((acc, val) => acc + val, 0)

  return total.toFixed(2)
}

const Checkout = () => {
  const navigate = useNavigate()
  const paymentFormRef = useRef(null)
  const { cart, addOrder, orderLoading } = useContext(ShopContext)
  const { user } = useContext(AuthContext)

  const [number, setNumber] = useState('')
  const [street, setStreet] = useState('')
  const [suburb, setSuburb] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [code, setCode] = useState('')
  const [orderNumber, setOrderNumber] = useState(
    Math.random().toString(16).slice(-8)
  )
  const [total, setTotal] = useState(
    calculateTotal(cart.map((item) => item.price * item.quantity))
  )
  const [firstname, setfirstname] = useState('')
  const handleComplete = () => {
    const order = {
      number,
      street,
      suburb,
      province,
      city,
      code,
      user_id: user.id,
      created_at: Date.now(),
      products: cart.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      orderNumber,
      status: 'Pending',
    }
    if (
      number === '' ||
      street === '' ||
      suburb === '' ||
      province === '' ||
      city === '' ||
      code === '' ||
      firstname=== ''
    )
      toast.error(
        'please make sure everything is filled before completing order'
      )
    else addOrder(order, navigate, paymentFormRef)
  }

  const params = new URLSearchParams({
    merchant_id: '11467929',
    merchant_key: '1so4eyhpghhi7',
    return_url: 'http://hmpengineering.co.za/done',
    cancel_url: 'http://hmpengineering.co.za/fail',
    notify_url: 'http://hmpengineering.co.za/',
    name_first: firstname,
    name_last: 'Doe',
    email_address: user.email,
    cell_number: number,
    m_payment_id: user.id,
    amount: total,
    item_name: `${cart.length} items`,
    item_description: orderNumber,
    custom_int1: '2',
    custom_str1: 'Extra order information',
    passphrase: 'HmpEngineeringSolutions2023',
  })

  // Create an MD5 signature of it.
  const MD5Signature = md5(params.toString())
  useEffect(() => {
    if (!cart.length) navigate('/cart')
  }, [])

  return (
    <div style={{ minHeight: '75vh' }}>
      <Container>
        <Card style={{ marginTop: 50 }}>
          <Card.Body>
            <Card.Title>Checkout #{orderNumber}</Card.Title>

            <Row>
              <Col md='6'>
                <h1>Shipping Information</h1>
                <div>
                  <Row>
                    <Col md='6'>
                      <Form.Group controlId='formGridEmail'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter name'
                          value={firstname}
                          onChange={e => setfirstname(e.target.value)}
                          
                          
                        />
                      </Form.Group>
                    </Col>
                    <Col md='6'>
                      <Form.Group controlId='formGridEmail'>
                        <Form.Label>Mobile number</Form.Label>
                        <Form.Control
                          type='number'
                          placeholder='Enter mobile number'
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId='formGridEmail'>
                    <Form.Label>Street address</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter street address'
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId='formGridEmail'>
                    <Form.Label>Suburb</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter suburb'
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId='formGridEmail'>
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter province'
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md='6'>
                      <Form.Group controlId='formGridEmail'>
                        <Form.Label>City / Town</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter city / town'
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md='6'>
                      <Form.Group controlId='formGridEmail'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                          type='number'
                          placeholder='Enter postal code'
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className='d-flex  align-items-center justify-content-between mt-5'>
                  <Link to='/cart'>Back to cart</Link>
                  {cart.length ? (
                    <Button
                      variant='dark'
                      onClick={handleComplete}
                      disabled={orderLoading}
                    >
                      {orderLoading ? 'Loading...' : ' Complete Order'}
                    </Button>
                  ) : null}
                </div>
              </Col>
              <Col md='6' style={{ borderLeft: '1px solid #bdbdbd' }}>
                {cart.map((item, index) => (
                  <div key={index} className='d-flex mt-1'>
                    <img
                      src={item.image}
                      alt={item.title}
                      width={90}
                      style={{ borderRadius: 5, marginRight: 5 }}
                    />
                    <div>
                      <h6>{item.title}</h6>
                      <p className='text-muted'>R {item.price}</p>
                    </div>
                  </div>
                ))}

                <hr />
                <div className='d-flex  align-items-center justify-content-between'>
                  <p style={{ fontSize: 18 }}>Total:</p>
                  <p style={{ fontWeight: '900', fontSize: 18 }}>R {total}</p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <form
        ref={paymentFormRef}
        action='https://www.payfast.co.za/eng/process'
        method='POST'
      >
        <input type='hidden' name='merchant_id' value='11467929' />
        <input type='hidden' name='merchant_key' value='1so4eyhpghhi7' />
        <input
          type='hidden'
          name='return_url'
          value='http://hmpengineering.co.za/done'
        />
        <input
          type='hidden'
          name='cancel_url'
          value='http://hmpengineering.co.za/fail'
        />
        <input
          type='hidden'
          name='notify_url'
          value='http://hmpengineering.co.za/'
        />

        <input type='hidden' name='name_first' value={firstname} />
        <input type='hidden' name='name_last' value='Doe' />
        <input type='hidden' name='email_address' value={user.email} />
        <input type='hidden' name='cell_number' value={number} />
        <input type='hidden' name='m_payment_id' value={user.id} />
        <input type='hidden' name='amount' value={total} />
        <input type='hidden' name='item_name' value={`${cart.length} items`} />
        <input type='hidden' name='item_description' value={orderNumber} />
        <input type='hidden' name='custom_int1' value='2' />
        <input
          type='hidden'
          name='custom_str1'
          value='Extra order information'
        />
        <input type='hidden' name='passphrase' value='HmpEngineeringSolutions2023' />
        <input type='hidden' name='signature' value={MD5Signature} />
      </form>
    </div>
  )
}

export default Checkout
