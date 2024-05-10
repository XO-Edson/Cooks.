import User from "../Models/user.js";

const handleLogout = async (req, res) => {
  //on client, also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  console.log(foundUser);
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(204);
  }

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log("Refresh Token", result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

export { handleLogout };
