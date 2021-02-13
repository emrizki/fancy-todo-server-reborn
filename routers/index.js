const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const weatherRouter = require('./weatherRouter')
const { authentication } = require('../middlewares')

router.get('/', (req, res) => {
  res.json({message: "Welcom to Fancy Todo Reborn"})
})
router.use('/users', userRouter)
router.use(authentication)
router.use('/todos', todoRouter)
router.use('/weather', weatherRouter)

module.exports = router