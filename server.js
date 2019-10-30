const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');
const httpMethod = require('./api/dateLogger-middleware.js');
const morgan = require('morgan');

const server = express();

// function dateLogger(req, res, next) {

//   console.log(new Date().toISOString());
//   next();
// };

function doubler(req,res,next){
  //turn string to number
  const number = Number(req.query.number || 0);
  req.doubled = number*2;
  console.log(req.doubled);
  next();
}

function gateKeeper(req,res,next){
  //new way of reading data from the client
  const password= req.headers.password;

    if (password.toLowerCase() === 'mellon'){
      next();
    } else if (!password.toLowerCase()){
      res.status(400).json({message: 'Please enter a password'});
    }else {
      res.status(401).json({message: 'You cannot pass!'});
    }
}


server.use(helmet());
server.use(express.json());
// can also use:
// server.use(helmet(), express.json())

server.use(gateKeeper);
server.use(morgan('dev'));
server.use(httpMethod);
// server.use(dateLogger);
server.use('/api/hubs', hubsRouter);


server.get('/', doubler, (req, res) => {
  // const nameInsert = (req.name) ? ` ${req.name}` : '';

  // res.send(`
  //   <h2>Lambda Hubs API</h2>
  //   <p>Welcome${nameInsert} to the Lambda Hubs API</p>
  //   `);

  res.status(200).json({number: req.doubled});
});

module.exports = server;
