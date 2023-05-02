const jwt = require('jsonwebtoken');

function generateToken(_id) {
  const payload = {
    _id,
  };
 
  return jwt.sign(payload, "KARYA-SECRET");
}

function generateTokenForBusiness(_id,verified) {
  const payload = {
    _id,
    isBusiness:true,
    verified
  };
 
  return jwt.sign(payload, "KARYA-SECRET");
}

function generateTokenForAdmin(_id) {
  const payload = {
    _id,
    isAdmin:true
  };
 
  return jwt.sign(payload, "KARYA-SECRET");
}

function checkAuthenticationHeader(req, res, next) {
  let isError = true;
    const token = req.headers.authorization;
    if (token != null) {
      try {
        const decoded = jwt.verify(token, "KARYA-SECRET");
        isError = false;
        console.log('decoded', decoded);
        req._id = decoded._id;
      } catch (error) {
        console.error('ERROR while verifying token', error);
      }
    } else {
      console.error('no authorization header');
    }
    if (isError) {
      throw new Error('Invalid Token, Please login again');
    //   res.status(401).json({ error: "Invalid Token, Please login again" });
    }
  
  next();
}

function checkBusinessAuthenticationHeader(req, res, next) {
  let isError = true;
    const token = req.headers.authorization;
    if (token != null) {
      try {
        const decoded = jwt.verify(token, "KARYA-SECRET");
        console.log('decoded', decoded);
        req._id = decoded._id;
        if(decoded.isBusiness){
          isError = false;
        }
      } catch (error) {
        console.error('ERROR while verifying token', error);
      }
    } else {
      console.error('no authorization header');
    }
    if (isError) {
      throw new Error('Invalid Token, Please login again');
    //   res.status(401).json({ error: "Invalid Token, Please login again" });
    }
  
  next();
}

function checkBusinessAuthenticationHeaderForVerified(req, res, next) {
  let isError = true;
    const token = req.headers.authorization;
    if (token != null) {
      try {
        const decoded = jwt.verify(token, "KARYA-SECRET");
        console.log('decoded', decoded);
        req._id = decoded._id;
        if(decoded.isBusiness){
          isError = false;
        }
        if(!decoded.verified){
          throw new Error('Business not verified');

        }
      } catch (error) {
        console.error('ERROR while verifying token', error);
        throw error;
      }
    } else {
      console.error('no authorization header');
    }
    if (isError) {
      throw new Error('Invalid Token, Please login again');
    //   res.status(401).json({ error: "Invalid Token, Please login again" });
    }
  
  next();
}

function checkAdminAuthenticationHeader(req, res, next) {
  let isError = true;
    const token = req.headers.authorization;
    if (token != null) {
      try {
        const decoded = jwt.verify(token, "KARYA-SECRET");
        console.log('decoded', decoded);
        req._id = decoded._id;
        if(decoded.isAdmin){
          isError = false;
        }
      } catch (error) {
        console.error('ERROR while verifying token', error);
      }
    } else {
      console.error('no authorization header');
    }
    if (isError) {
      throw new Error('Invalid Token, Please login again');
    //   res.status(401).json({ error: "Invalid Token, Please login again" });
    }
  
  next();
}
module.exports = { generateToken, generateTokenForBusiness,checkBusinessAuthenticationHeaderForVerified, generateTokenForAdmin, checkAdminAuthenticationHeader, checkBusinessAuthenticationHeader, checkAuthenticationHeader };
