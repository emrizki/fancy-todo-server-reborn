const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const weatherRouter = require('./weatherRouter')
const { authentication } = require('../middlewares')

router.use('/users', userRouter)
router.use(authentication)
router.use('/todos', todoRouter)
router.use('/weather', weatherRouter)

module.exports = router