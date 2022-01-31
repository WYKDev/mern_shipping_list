const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = {
   register: function(req, res, model) {

      const { name, email, password } = req.body;
         
      if(!name || !email || !password) return res.status(400).json({ msg: 'Please enter all fields' });
   
      model.findOne({ email })
         .then( user => {
            if(user) return res.status(400).json({ msg: 'User already exists.' })
            
            const User = new model({ name, email, password })
   
            // Generate salt and hash
            bcrypt.genSalt(11, (err, salt) => {
               if(err) throw err;
   
               bcrypt.hash(User.password, salt, (err, hash) => {
                  if(err) throw err;
                  User.password = hash;
                  User.save().then( user => {
                     const { id, name, email } = user;
   
                     jwt.sign( {id}, config.get('jwtSecret'), {expiresIn: 3600}, 
                        (err, token) => {
                           if(err) throw err;
                           res.json({ user: {id, name, email}, token: token})
                        }
                     )
                  })
               })
            })
         })
   },

   login: function(req, res, model) {

      const { email, password } = req.body;
         
      if(!email || !password) return res.status(400).json({ msg: 'Please enter all fields' });
   
      model.findOne({ email })
         .then( user => {
            if(!user) return res.status(400).json({ msg: 'User does not exists.' })
            
            const { id, name, email } = user;
            
            // Compare credential
            bcrypt.compare(password, user.password)
               .then( isMatch => {
                  if(!isMatch) return res.status(400).json({ msg: 'Invalid credential' })
   
                  jwt.sign(
                     { id: id }, config.get('jwtSecret'), { expiresIn: 3600 }, 
                     (err, token) => {
                        if(err) throw err;
                        res.json({ user: {id, name, email}, token: token})
                     }
                  )
               })
         })
   }
}