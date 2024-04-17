import React from 'react'
import { Card, Container } from 'react-bootstrap'

const PaymentFailed = () => {
  return (
    <div style={{ minHeight: '75vh' }}>
      <Container>
        <Card style={{ marginTop: 50 }}>
          <Card.Body>
            <div className='text-center'>
              <ion-icon
                style={{ fontSize: 120, color: 'tomato' }}
                name='close-circle'
              ></ion-icon>
            </div>
            <h1 className='text-center'>Order was unsuccessful</h1>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default PaymentFailed
