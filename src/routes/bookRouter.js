/* eslint-disable no-param-reassign */
const express = require('express');
const debug = require('debug')('app:routes');

function routes(Book) {
  const bookRouter = express.Router();
  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      debug(book);
      book.save();
      return res.status(201).json(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.rating) {
        query.rating = req.query.rating;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });
  bookRouter.use('/books/:id', (req, res, next) => {
    Book.findById(req.params.id, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter.route('/books/:id')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      const {
        title, description, author, rating, published
      } = req.body;
      book.title = title;
      book.description = description;
      book.author = author;
      book.rating = rating;
      book.published = published;
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return bookRouter;
}

module.exports = routes;
