import { useContext, useEffect } from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Register from './pages/Register'
import { auth } from './firebase/config'
import AuthContext from './context/auth/authContext'
import RequireAuth from './components/RequireAuth'
import ShopContext from './context/shop/shopContext'
import Checkout from './pages/Checkout'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFailed'
import Loading from './components/Loading'
import Logo from './assets/logo2.png'
import '../src/styles/App.css';

function App() {
  const { setUser, logout, user, userLoading, dispatch } =
    useContext(AuthContext)
  const { cart } = useContext(ShopContext)
  useEffect(() => {
    dispatch({ type: 'GET_USER_LOADING' })
    auth.onAuthStateChanged((user) => setUser(user))
  }, [])
  if (userLoading && !user) {
    return (
      <div
        className='d-flex align-items-center justify-content-center'
        style={{ height: '100vh' }}
      >
        <Loading />
      </div>
    )
  }
  return (
    <div className='App'>
      <ToastContainer hideProgressBar />
      <Navbar expand='lg' >
        <Container>
          <Link className='navbar-brand' to='/'>
            <img src={Logo} alt='logo' width={85} />
          </Link>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link className='nav-link' to='/'>
                Home
              </Link>
              <Link className='nav-link' to='/shop'>
                Shop
              </Link>
              <Link className='nav-link' to='/contact'>
                Contact Us
              </Link>
              <Link className='nav-link' to='/blog'>
                Blog
              </Link>
              <Link className='nav-link' to='/orders'>
                Orders
              </Link>
            </Nav>
            <Nav>

            <button
      style={{
        marginTop: '12px',
        my: '2px',
        mx: '1px',
        display: 'block',
        fontWeight: 'bold',
        backgroundColor: '#76ae36', // Set the background color to bright green
        color: 'black', // Set the text color to black
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        height: '40px', // Add height to the button
        width: '300px', // Add width to the button
      }}
    >
      HMP ENGINEERING SOLUTIONS
    </button>
              <Link className='nav-link d-flex align-items-center' to='/cart'>
                <ion-icon name='cart'></ion-icon>({cart.length})
              </Link>

              {user ? (
                <span
                  style={{ cursor: 'pointer' }}
                  className='nav-link'
                  onClick={() => logout()}
                >
                  Logout ({user.name})
                </span>
              ) : (
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              )}
            </Nav>

            {/* <Navbar.Text>
              <a href='#login'>Mark Otto</a>
            </Navbar.Text> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/orders'
          element={
            <RequireAuth>
              <Orders />
            </RequireAuth>
          }
        />
        <Route
          path='/checkout'
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route path='shop' element={<Shop />} />
        <Route path='contact' element={<Contact />} />
        <Route path='blog' element={<Blog />} />
        <Route path='cart' element={<Cart />} />
        <Route path='login' element={<Login />} />
        <Route path='orders' element={<Orders />} />
        <Route path='register' element={<Register />} />
        <Route path='done' element={<PaymentSuccess />} />
        <Route path='fail' element={<PaymentFailed />} />
      </Routes>

      <footer
        className='d-flex align-items-center'
        style={{ backgroundColor: '#1c1c1c', height: 200, marginTop: 30 }}
      >
        <Container>
          <Row>
            <Col md={4}>
              <p style={{ color: 'white' }}>
                &copy; {new Date().getFullYear()} HMP ENGINEERING SOLUTIONS -
                All Rights Reserved.
              </p>
            </Col>
            <Col md={4}>
              <div className='d-flex align-items-center justify-content-center'>
                <a style={{ color: 'white', margin: '0 5px' }} href='https://www.linkedin.com/company/hmpengineering'>
                  <ion-icon name='logo-linkedin'></ion-icon>
                </a>
                <a style={{ color: 'white', margin: '0 5px' }} href='https://www.facebook.com/111023744597208'>
                  <ion-icon name='logo-facebook'></ion-icon>
                </a>
                <a style={{ color: 'white', margin: '0 5px' }} href='https://www.twitter.com/hmp_engineering'>
                  <ion-icon name='logo-twitter'></ion-icon>
                </a>
                <a style={{ color: 'white', margin: '0 5px' }} href='https://www.instagram.com/hmpengineering'>
                  <ion-icon name='logo-instagram'></ion-icon>
                </a>
              </div>
            </Col>
            <Col md={4}>
              <p style={{ color: 'white' }}>
                Expert engineering services at your fingertips!!
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default App
