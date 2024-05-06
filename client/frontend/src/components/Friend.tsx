import { useDispatch, useSelector } from "react-redux";
import { InitialState, setFriend } from "../ReduxContext/context";
import { useNavigate } from "react-router-dom";
import userImg from "../assets/p3.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";

type Props = {
  friendId: string;
  name: string;
  subTitle: string;
  userPicturePath: string;
};

type stateType = {
  auth: InitialState;
};

function Friend({ friendId, name, subTitle, userPicturePath }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state: stateType) => state.auth);

  const isFriend = user;

  console.log(user);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${user?._id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);

    dispatch(setFriend(data));
  };

  return (
    <div className="flex gap-x-2">
      <div
        onClick={() => {
          navigate(`/profile/${friendId}`);
          navigate(0);
        }}
        className="flex"
      >
        <div className=" w-full">
          <img
            src={userImg}
            alt="user"
            className=" object-cover h-[60px] w-[60px] rounded-full mr-5 block"
          />
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div>
          <p> {name}</p>
          <p className=" text-xs text-gray-400"> {subTitle}</p>
        </div>
        <p onClick={() => patchFriend()}>
          {isFriend ? (
            <FontAwesomeIcon
              icon={faUserMinus}
              className={isFriend ? "text-orange-600" : ""}
            />
          ) : (
            <FontAwesomeIcon
              icon={faUserPlus}
              className={isFriend ? "text-orange-600" : ""}
            />
          )}
        </p>
      </div>
    </div>
  );
}

export default Friend;
