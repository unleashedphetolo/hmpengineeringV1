import React, { useReducer } from 'react'
import ShopContext from './shopContext'
import {
  PRODUCTS_LOADING,
  GET_PRODUCTS,
  ADD_TO_CART,
  INCREMENT_QTY,
  DECREMENT_QTY,
  REMOVE_CART_ITEM,
  ADD_ORDER,
  ORDER_LOADING,
  SHOP_ERROR,
  GET_ORDERS,
  GET_POSTS,
} from '../types'
import { db } from '../../firebase/config'
import ShopReducer from './shopReducer'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { toast } from 'react-toastify'

const ShopState = ({ children }) => {
  const initialState = {
    errors: null,
    products: null,
    posts: null,
    orders: null,
    loading: false,
    orderLoading: false,
    cart: [],
  }
  const [state, dispatch] = useReducer(ShopReducer, initialState)
  const productsCollection = collection(db, 'products')
  const ordersCollection = collection(db, 'orders')
  const postsCollection = collection(db, 'posts')

  const getProducts = async () => {
    setProductsLoading()
    try {
      const q = query(productsCollection)
      const res = await getDocs(q)
      const products = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      dispatch({ type: GET_PRODUCTS, payload: products })
    } catch (error) {
      dispatch({ type: SHOP_ERROR })
      console.log(error)
    }
  }

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product })
    toast.success('Added To Cart')
  }

  const incrementQty = (id) => {
    dispatch({ type: INCREMENT_QTY, payload: id })
  }
  const decrementQty = (id) => {
    dispatch({ type: DECREMENT_QTY, payload: id })
  }
  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
    toast.success('Item Removed from Cart')
  }

  const addOrder = async (order, navigate, paymentFormRef) => {
    setOrderLoading()
    try {
      await addDoc(ordersCollection, order)
      dispatch({ type: ADD_ORDER })
      paymentFormRef.current.submit()
      // navigate('/orders')
    } catch (error) {
      dispatch({ type: SHOP_ERROR })
      console.log(error)
    }
  }
  const getOrders = async (id) => {
    setOrderLoading()
    try {
      const q = query(ordersCollection, where('user_id', '==', id))
      const res = await getDocs(q)

      const orders = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      dispatch({ type: GET_ORDERS, payload: orders })
    } catch (error) {
      dispatch({ type: SHOP_ERROR })
      console.log(error)
    }
  }

  const getPosts = async () => {
    setOrderLoading()
    try {
      const q = query(postsCollection)
      const res = await getDocs(q)

      const posts = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      dispatch({ type: GET_POSTS, payload: posts })
    } catch (error) {
      dispatch({ type: SHOP_ERROR })
      console.log(error)
    }
  }

  // Set Loading
  const setProductsLoading = () => dispatch({ type: PRODUCTS_LOADING })
  const setOrderLoading = () => dispatch({ type: ORDER_LOADING })

  return (
    <ShopContext.Provider
      value={{
        errors: state.errors,
        products: state.products,
        posts: state.posts,
        orders: state.orders,
        loading: state.loading,
        orderLoading: state.orderLoading,
        cart: state.cart,
        dispatch,
        getProducts,
        addToCart,
        incrementQty,
        decrementQty,
        removeCartItem,
        addOrder,
        getOrders,
        getPosts,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export default ShopState
