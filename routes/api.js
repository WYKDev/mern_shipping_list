const express = require('express');

// Developer Imports
const models = require('../models');
// const controllers = require('../controller');
const AuthController = require('../controller/auth');
const auth = require('../middlewares/auth');

const router = express.Router();

// @route   GET api/:resource
// @desc    Get All Items in model[:resource]
// @accss   Public
router.get('/items', (req, res) => {
   
   const model = models.items;

   if(!model) return res.json({ confirmation: 'fail',  result: `Invalid Resource Request: ${resource}` });

   model
   .find()
   .sort({ date: -1 })
   .then( items => res.json(items) )
   .catch( err => console.log(err) )
})

// @route   POST api/:resource
// @desc    Create an item in models[:resource]
// @accss   Private
router.post('/items', auth, (req, res) => {
   
   const model = models.items;

   // If resource not anything above,
   // we will check if the model exist
   if(!model) {
      res.json({ confirmation: 'fail',  result: `Invalid Resource Request: ${resource}` })
      return;
   }

   // Generic 
   const newItem = new model({
      name: req.body.name
   });

   newItem.save().then( item => res.json(item) )
})


// @route   DELETE api/items/:id
// @desc    Delete an item in in models[:resource]
// @accss   Private
router.delete('/items/:id', auth, (req, res) => {
   const model = models.items;
   const id = req.params.id

   if(!model) {
      res.json({ confirmation: 'fail',  result: `Invalid Resource Request: ${resource}` })
      return;
   }

  model.findById(id)
   .then( item => {
      item.remove().then( () => res.json({ msg: 'Delete success.' }) )
   })
   .catch( err => res.status(404).json({ msg: 'Not found.' }))
})


// @route   GET api/auth/user
// @desc    Get user data
// @accss   Private
router.get('/auth/user', auth, (req, res) => {
   
   models.users
      .findById(req.user.id)
      .select('-password')
      .then( user => res.json(user) )
      .catch( err => res.status(404).json(err) )
})


// @route   POST api/auth
// @desc    Get user data
// @accss   Public
router.post('/auth', (req, res) => {

   const model = models.users;

   if(!model) {
      res.json({ confirmation: 'fail',  result: `Invalid Resource Request: ${resource}` })
      return;
   }

   AuthController.login(req, res, model);
})


// @route   POST api/user
// @desc    Get user data
// @accss   Public
router.post('/users', (req, res) => {
   
   const model = models.users;

   if(!model) {
      res.json({ confirmation: 'fail',  result: `Invalid Resource Request: ${resource}` })
      return;
   }

   AuthController.register(req, res, model);
})


module.exports = router;