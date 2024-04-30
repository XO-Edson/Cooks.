import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";

/* REGISTER USER */

const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

/* LOGIN */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findone({ email }).exec();

    if (!user) return res.status(400).json({ messsage: "User does not exist" });

    const isMatch = await bcrypt.compare(res.password, password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ _id: user.id }, process.env.ACCESS_TOKEN);

    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export { register, login };
