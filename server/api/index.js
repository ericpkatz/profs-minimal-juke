const router = require('express').Router()
const { models: { Album, Artist, Song } } = require('../db');

// connect your API routes here!

module.exports = router


router.get('/albums', async(req, res, next)=> {
  try {
    res.send(await Album.findAll());
  }
  catch(ex){
    next(ex);
  }
});

router.get('/albums/:id', async(req, res, next)=> {
  try {
    res.send(await Album.findByPk(req.params.id, {
      include: [ Artist, Song ]
    }));
  }
  catch(ex){
    next(ex);
  }
});
