import { useDispatch, useSelector } from "react-redux";
import { InitialState, setPosts } from "../../ReduxContext/context";
import { useEffect } from "react";
import Post from "./Post";

type stateType = {
  auth: InitialState;
};

type Props = {
  userId: string;
  isProfile: boolean;
};

function Posts({ userId, isProfile }: Props) {
  console.log(isProfile);
  console.log(userId);

  const dispatch = useDispatch();
  const { token, posts } = useSelector((state: stateType) => state.auth);

  const getFeedPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error(`Failed to fetch posts: ${response.statusText}`);
      return;
    }

    const data = await response.json();

    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    console.log("running...");

    const response = await fetch(`http://localhost:3001/posts/${userId}`, {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getFeedPosts();
    }
  }, []);

  return (
    <section>
      {posts ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comment,
          }) => (
            <Post
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comment={comment}
            />
          )
        )
      ) : (
        <div>No posts available</div>
      )}
    </section>
  );
}

export default Posts;
