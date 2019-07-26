const express = require('express')
const router = express.Router()

const Book = require('../models/Book.model')


// Listado de libros
router.get('/list', (req, res, next) => {
  Book.find({})
    .then(allTheBooks => res.render('books-list', { books: allTheBooks }))  // ojo! pasar obj
    .catch(err => console.log('Hubo un error:', err))
})


// Detalle de libro
router.get('/detail/:id', (req, res, next) => {
  const bookId = req.params.id
  Book.findById(bookId)
    .populate('author')
    .then(theWholeBook => res.render('book-detail', { book: theWholeBook }))
    .catch(err => console.log('Hubo un error:', err))
})


// Creación de nuevo libro
router.get('/create', (req, res, next) => res.render('books-add'))
router.post('/create', (req, res, next) => {

  //console.log(req.body)

  /*const theBookData = {
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
    title: req.body.title
  }*/

  const { author, description, rating, title } = req.body

  Book.create({ author, description, rating, title })
    .then(() => res.redirect('/books/list'))
    .catch(err => console.log('Hubo un error:', err))
})



// Edición de libro
router.get('/edit', (req, res, next) => {
  //console.log(req.query)
  Book.findById(req.query.bookId)
    .then(theBook => res.render('book-edit', { theBook }))
    .catch(err => console.log('Hubo un error:', err))
})
router.post('/edit', (req, res, next) => {

  const { author, description, rating, title } = req.body

  // Todos los métodos de actualizar pueden recibir {new: true} como último argumento opcional, retornando el nuevo elemento y no el previo al update
  Book.findByIdAndUpdate(req.query.bookId, { $set: { title, author, description, rating } }, { new: true })
    .then(theNewBook => {
      console.log(theNewBook)
      res.redirect('/books/list')
    })
    .catch(err => console.log('Hubo un error:', err))
})

module.exports = router