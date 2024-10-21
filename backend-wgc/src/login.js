import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function generateAccessToken(username) {
    return jwt.sign( {name : username} , process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

  export function validateLoginCredentials(collection, credentials ){
    const salt = process.env.PASSWORD_SALT;
    const password = credentials.password;

    const hash = bcrypt.hashSync(password, salt);

    return collection.find({ login: credentials.login, password: hash }).toArray();
  }

  export async function createUser(collection, userData ){
    const salt = process.env.PASSWORD_SALT;
    const password = userData.password;

    const hash = bcrypt.hashSync(password, salt);

    return await collection.insertOne({
        login: userData.login, 
        password: hash
    });
  }

  