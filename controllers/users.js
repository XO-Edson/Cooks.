import User from "../Models/user.js";

/* READ */
const getUser = async (req, res) => {
  try {
    const { id } = req.body;
    const foundUser = await User.findById({ id }).exec();

    if (!foundUser) return res.status(400).json({ message: "user not found" });

    res.status(200).json(foundUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.body;
    const foundUser = await User.findById({ id }).exec();
    if (!foundUser) return res.status(400).json({ message: "user not found" });

    const friends = await Promise.all(
      foundUser.friends.map((id) => foundUser.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturePath }) => {
        return { _id, firstname, lastname, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */

const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = user.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      foundUser.friends.map((id) => foundUser.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturePath }) => {
        return { _id, firstname, lastname, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export { getUser, getUserFriends, addRemoveFriend };
