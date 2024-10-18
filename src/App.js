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
import Logo from './assets/IconLogo.jpg'
import xLogo from './assets/x.png';
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
              style={{ maxHeight: 'auto' }}
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
  className='hmp-button'
  style={{
    marginTop: '10px',
    my: '2px',
    mx: '1px',
    display: 'block',
    fontWeight: 'bold',
    backgroundImage: 'linear-gradient(135deg, #76ae36, #4b8a23)', // Add gradient background
    color: 'black', // Set text color to white for better contrast
    padding: '12px 24px', // Increase padding for better look
    border: '2px solid #4b8a23', // Add a border for sleekness
    borderRadius: '8px', // Increase border-radius for a rounded look
    cursor: 'pointer',
    height: '50px', // Adjust height for better presence
    width: '320px', // Adjust width for balance
    marginRight: '40px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Add a soft shadow for depth
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover transitions
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'scale(1.05)'; // Slight scale on hover
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
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
                <a style={{ color: 'white', margin: '0 5px' }} href='https://www.linkedin.com/company/hmpengineering'
                target="_blank" 
                rel="noopener noreferrer"
                >
                  <ion-icon name='logo-linkedin'></ion-icon>
                </a>
                <a style={{ color: 'white', margin: '0 5px' }} href='https://www.facebook.com/111023744597208'
                target="_blank" 
                rel="noopener noreferrer"
                >
                  <ion-icon name='logo-facebook'></ion-icon>
                </a>
                <a style={{ color: 'white', margin: '0 5px' }} href='https://www.x.com/hmp_engineering' aria-label="X Logo"
                target="_blank" 
                rel="noopener noreferrer"
                >
               <img 
                src={xLogo} alt="X Logo"  style={{ width: '35px', height: '35px', marginBottom:'5px', borderRadius:'100px' }} />
              </a>

                <a style={{ color: 'white', margin: '0 5px' }} href='https://www.instagram.com/hmpengineering'
                target="_blank" 
                rel="noopener noreferrer"
                >
                  
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
