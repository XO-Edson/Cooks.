import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    let token = req.get("authorization");
    if (!token) return res.status(403).send("Access Denied:No token provided");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export default verifyToken;
