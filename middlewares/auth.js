const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = auth = (req, res, next) => {
   // const { body, params } = req;
   // const resource = params.resource.toLowerCase();
   // const method = req.method.toLowerCase();

   // // If accessing at the /api/users or /api/auth with POST method,
   // // It is most likely that user is trying "register" or "login"
   // if( (resource === 'users' || resource === 'auth') && method === 'post' ) return next();

   // // If accessing at the /api/users
   // // with POST method, do following
   // if( resource === 'users' && method === 'delete' ) {
   //    if( body.id !== params.id ) return res.status(401).json({ msg: 'Action Not Authorized.' });
   // }
   
   // Extract the token
   const token = req.get('x-auth-token') || null;
   
   // Check token
   if(!token) return res.status(401).json({ msg: 'Unauthorized access.' })

   try {
      // Verfiy token
      req.user = jwt.verify(token, config.get('jwtSecret'));
      
      // This prevent user delete other user or hacker delete other user
      // It is to make sure that the owner is deleting himself
      // if( resource === 'users' && method === 'delete' ) {
      //    if( req.user.id !== params.id ) return res.status(401).json({ msg: 'Action Not Authorized.' });
      // }

      // Everything good
      return next();
   } catch(e) {
      res.status(400).json({ msg: 'Invalid token.' })
   }
};