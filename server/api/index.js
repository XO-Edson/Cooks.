import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from "../config/dbConnect.js";
import { register } from "../controllers/auth.js";
import { createPost } from "../controllers/posts.js";
import authRoutes from "../routes/auth.js";
import userRoutes from "../routes/users.js";
import postsRoutes from "../routes/posts.js";
import verifyToken from "../middleware/auth.js";
import refreshRoute from "../routes/refresh.js";
import cookieParser from "cookie-parser";
import logoutRoute from "../routes/logout.js";
import User from "../Models/user.js";
import Post from "../Models/post.js";
import { users, posts } from "../data/index.js";

/* CONFIG */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "15mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

connectDB();

app.use(cookieParser());

/* FILE-STORAGE */
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, res, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/", (req, res) => res.status(200).json({ message: "Working..." }));
app.use("/auth", authRoutes);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  /* ADD RANDOM POSTS AND USERS */
  /*   User.insertMany(users);
  Post.insertMany(posts); */
});
