import Friend from "../../components/Friend";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { InitialState, setFriend } from "../../ReduxContext/context";

type stateType = {
  auth: InitialState;
};

function FriendList({ userId }: any) {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: stateType) => state.auth);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${user?._id}/friends`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    dispatch(setFriend(data));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <section className="bg-slate-900 p-2 rounded-md h-fit">
      <h2>Friend List</h2>
      <hr className=" border-slate-700 my-2" />
      <div>
        {user?.friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subTitle={friend.location}
            userPicturePath={friend.picturePath}
          />
        ))}
      </div>
    </section>
  );
}

export default FriendList;
