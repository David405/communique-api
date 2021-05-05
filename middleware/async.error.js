module.exports = (error, req, res, next) => {
    const data = {
      success: false,
      message: `Something failed:... ${error.message}`
    };
  
    console.error('From async error middleware', error);
    next(error);
    return res.status(500).send(data);
  };