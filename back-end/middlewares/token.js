const jwt = require("jsonwebtoken");
const handler = {
  verifyToken: (req, res, next) => {
    try {
      if (!req.cookies.bearer) {
        return res.status(401).send("No token");
      }

      const token = req.cookies.bearer;

      jwt.verify(
        token,
        process.env.JWT_KEY,
        {
          algorithm: "HS256",
          expire: process.env.COOKIE_AGE,
        },
        (err, payload) => {
          if (err) {
            return res.status(400).send("Expired/Invalid token");
          }
          next();
        }
      );
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  },
};

module.exports = handler;
