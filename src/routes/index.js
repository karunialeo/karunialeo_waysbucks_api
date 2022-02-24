const express = require('express')

const router = express.Router()

const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')
const { replaceFile } = require('../middlewares/replaceFile')

const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { register, login, checkAuth } = require('../controllers/auth')
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { addTopping, getToppings, getTopping, updateTopping, deleteTopping } = require('../controllers/topping')
const { addOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/order')


router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);

router.post('/product', auth, uploadFile('image'), addProduct)
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.patch('/product/:id', auth, replaceFile('image'), updateProduct)
router.delete('/product/:id', auth, deleteProduct)

router.post('/topping', auth, uploadFile('image'), addTopping)
router.get('/toppings', getToppings)
router.get('/topping/:id', getTopping)
router.patch('/topping/:id', auth, updateTopping)
router.delete('/topping/:id', auth, deleteTopping)

router.post('/order', auth, addOrder)
router.get('/orders/:id', getOrders)
router.patch('/order/:id', auth, updateOrder)
router.delete('/order/:id', auth, deleteOrder)

module.exports = router