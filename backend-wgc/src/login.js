import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const whiteList = [
  '/invitation/',
  '/update-invitation',
  '/login-user'
];

export function generateAccessToken(username) {
    return jwt.sign( {name : username} , process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }

export function authenticateToken(req, res, next) {
    const confirmationDate = new Date(process.env.CONFIRATION_DATE).getTime();
    const currentDate = new Date().getTime();

    if(whiteList.some(val => req.path.includes(val)) && !(req.path.includes('/update-invitation') && confirmationDate - currentDate < 0)){
      next();
      return;
    }

    const authHeader = req.headers['cookie']
    const token = authHeader && authHeader.split('=')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {  
      if (err) return res.sendStatus(403)
  
      req.user = user.name
  
      next()
    })
  }

  export async function validateLoginCredentials(collection, credentials ){
    const salt = process.env.PASSWORD_SALT;
    const password = credentials.password;
    const hash = bcrypt.hashSync(password, salt);
    
    const user = await collection.find({ login: credentials.login, password: hash }).toArray();

    if(user.length !== 1){
      return {
        token : null, 
        user: null,
        status: 400,
        isFine : false
      };
    } else {
      return {
        token : generateAccessToken(user[0].login), 
        user: user[0].login,
        status: 200,
        isFine : true 
      };
    }
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