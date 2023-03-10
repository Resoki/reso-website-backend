const myMiddleware = (req, res, next) => {
  // do something
  next();
};

module.exports = myMiddleware;
