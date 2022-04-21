const logger = (req, res, next) => {
  const info = {
    path: req.path,
    query: req.query ? JSON.stringify(req.query) : null,
    body: req.body ? JSON.stringify(req.body) : null,
  };
  console.log(
    "\n----------------------\n[LOGGER -> Request Info]",
    info,
    "\n----------------------\n"
  );
  next();
};

module.exports = logger;