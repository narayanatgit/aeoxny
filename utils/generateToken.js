const jwt = require('jsonwebtoken')


const generateToken = (user_id) =>
{
  return jwt.sign({ id: user_id }, 'nodejs', { expiresIn: '1d' })

}


module.exports = generateToken;