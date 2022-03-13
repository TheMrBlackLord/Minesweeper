const { Router } = require('express')
const { NotFoundError } = require('../errors/api.errors')

const router = Router()

router.all('*', (_, __, next) => {
   next(new NotFoundError())
})

module.exports = router
