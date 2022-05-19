const returnResponse = ({ code, msg, data = null }, res) => {
  res.status(code).json({
    code,
    msg,
    data,
  });
};

module.exports = returnResponse;
