import User from "./server/Models/user.js";
import jwt from "jsonwebtoken";

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || foundUser.user !== decoded.username) return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  });
};

export default { handleRefresh };
