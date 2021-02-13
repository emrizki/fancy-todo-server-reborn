module.exports = (err, req, res, next) => {
  switch (err.name) {
    case 'email':
      res.status(400).json({message: err.message})
      break;
    case 'password':
      res.status(400).json({message: err.message})
      break
    case 'passwordNotMatch':
      res.status(400).json({message: 'Invalid Email / Password'})
      break
    case 'emailNotValid':
      res.status(400).json({message: 'Invalid Password / Email'})
      break
    case 'authentication':
      res.status(401).json({message: 'Welcome to Fancy todo Reborn'})
      break
    case 'needJWT':
      res.status(401).json({message: 'Please Login First'})
      break
    case 'authorization':
      res.status(401).json({ message: 'you are not authorize to access this todo' });
      break
    case 'due_date':
      res.status(400).json({message: err.message});
      break
    case 'todoNotFound':
      res.status(404).json({ message: 'Todo Not Found' });
      break
    case 'status':
      res.status(400).json(error.errors[0]);
      break
    default:
      res.status(500).json({message: 'Internal Server Error', msg: err.message})
      break;
  }
}