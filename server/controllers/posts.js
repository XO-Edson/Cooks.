import Post from "../Models/post.js";
import User from "../Models/user.js";

/* CREATE */
const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    if (!userId || !description) {
      return res
        .status(400)
        .json({ message: "Missing required fields: userId and description." });
    }
    if (!user) {
      return res.json({ message: "User missing" });
    } else {
      console.log(user);
    }

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: {},
    });

    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* READ */
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */
const likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);

    const isLiked = post.likes.has(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getFeedPosts, getUserPosts, createPost, likePosts };
