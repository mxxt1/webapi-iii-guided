const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function dateLogger(req, res, next) {

  console.log(new Date().toISOString());
  next();
};

function httpMethod(req,res,next){
  console.log(req.method);
  console.log(req.get('host'));
  console.log(req.originalUrl);

  next();
}


server.use(helmet());
server.use(express.json());
// can also use:
// server.use(helmet(), express.json())



server.use(httpMethod);
server.use(dateLogger);
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
