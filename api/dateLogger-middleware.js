

function httpMethod(req,res,next){
    console.log(new Date().toISOString());
    console.log(req.method);
    console.log(req.get('host'));
    console.log(req.originalUrl);
    next();
  }


module.exports = httpMethod;