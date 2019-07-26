const express = require('express')
const router = express.Router()

const Author = require('../models/Author.model')

router.get('/create', (req, res, next) => res.render('authors-add'))
router.post('/create', (req, res, next) => {

  const { name, lastName, nationality, birthday, pictureUrl } = req.body

  Author.create({ name, lastName, nationality, birthday, pictureUrl })
    .then(() => res.redirect('/books/list'))
    .catch(err => console.log('UEPA!:', err))
})


module.exports = router