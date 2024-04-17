import React from 'react'
import { Card, Container } from 'react-bootstrap'

const PaymentSuccess = () => {
  return (
    <div style={{ minHeight: '75vh' }}>
      <Container>
        <Card style={{ marginTop: 50 }}>
          <Card.Body>
            <div className='text-center'>
              <ion-icon
                style={{ fontSize: 120, color: '#0bb783' }}
                name='checkbox'
              ></ion-icon>
            </div>
            <h1 className='text-center'>Order made successfully</h1>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default PaymentSuccess
