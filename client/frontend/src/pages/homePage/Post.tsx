import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitialState, PostType, setPost } from "../../ReduxContext/context";
import Friend from "../../components/Friend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

type stateType = {
  auth: InitialState;
};

type PropType = {
  postId: string;
  postUserId: string;
  userId: string;
  name: string;
  description: string;
  location: string;
  picturePath: string;
  userPicturePath: string;
  likes: any;
  comments: string[];
};

function Post({
  postId,
  postUserId,
  userId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}: PropType) {
  const dispatch = useDispatch();
  const [isComment, setIsComment] = useState(false);
  const { user, token } = useSelector((state: stateType) => state.auth);
  const isliked = Object.keys(likes).some((key) => key === user?._id);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?._id }),
    });

    const updatedPost = await response.json();

    dispatch(setPost(updatedPost));
  };

  return (
    <div className=" bg-slate-900 my-2 p-2 rounded-md gap-x-2">
      <Friend
        friendId={postUserId}
        name={name}
        subTitle={location}
        userPicturePath={userPicturePath}
      />
      <hr className=" border-slate-700 my-2" />
      <div>
        <p className=" pb-2"> {description}</p>
        {picturePath && (
          <img
            src={`http://localhost:3001/assets/${picturePath}`}
            className=" object-cover rounded-md block"
          />
        )}
      </div>

      <div className="flex">
        <p onClick={patchLike} className=" mr-1">
          <FontAwesomeIcon
            icon={faHeart}
            className={isliked ? "text-orange-600" : ""}
          />
        </p>
        <p>{likeCount}</p>
      </div>
    </div>
  );
}

export default Post;
