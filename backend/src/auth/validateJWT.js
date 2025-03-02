const jwt = require('jsonwebtoken');

const { userService } = require('../service');

const secret = '';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Missiing auth token!' });
  }

  try {
    //const decoded = jwt.verify(token, secret);
    const user = await userService.userByEmail(token.email);

    if (!user) {
      return res.status(401).json({ message: 'Error fetching user data' });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
