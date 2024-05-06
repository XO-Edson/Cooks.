import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InitialState, UserType } from "../../ReduxContext/context";
import twitterImg from "../../assets/twitter.png";
import linkedInImg from "../../assets/linkedin.png";
import userImg from "../../assets/p3.jpeg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBriefcase,
  faPen,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

type stateType = {
  auth: InitialState;
};

function User() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state: stateType) => state.auth);

  const [userProfile, setUserProfile] = useState<UserType>();

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${user?._id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      setUserProfile(data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <section className="bg-slate-900 p-2 rounded-md h-fit">
      {/* First-Row */}
      <div className="flex justify-between mb-2 items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate(`/profile/${userProfile?._id} `)}
        >
          <img
            src={userImg}
            alt="userImg"
            className=" object-cover h-[70px] w-[70px] rounded-full mr-4"
          />
          <div>
            <p>
              {userProfile?.firstName} {userProfile?.lastName}
            </p>
            <p>{userProfile?.friends.length} Friends</p>
          </div>
        </div>
        <div className=" cursor-pointer">
          <FontAwesomeIcon icon={faUserPlus} />
        </div>
      </div>

      <hr className=" border-gray-700" />

      {/* Second Row */}

      <div className=" flex mb-6 mt-2">
        <div className=" mr-6">
          <div className=" flex mb-3">
            <p className=" mr-6">
              <FontAwesomeIcon icon={faLocationDot} size="lg" />
            </p>
            <p>{userProfile?.location}</p>
          </div>

          <div className=" flex">
            <p className=" mr-6">
              <FontAwesomeIcon icon={faBriefcase} size="lg" />
            </p>
            <p>{userProfile?.occupation}</p>
          </div>
        </div>
      </div>

      <div className=" mb-2 flex justify-between">
        <div>
          <p>Who's viewed your profile :</p>
          <p>Impressions on your profile :</p>
        </div>

        <div>
          <p> {userProfile?.viewedProfile}</p>
          <p> {userProfile?.impressions}</p>
        </div>
      </div>

      <hr className=" border-gray-700" />

      {/* Third row */}
      <div className=" mt-2">
        <h2 className=" font-bold">Social Profiles</h2>
        <div className="flex justify-between items-center">
          <img src={twitterImg} alt="TwitterIcon" className=" object-cover" />
          <div>
            <h3>Twitter</h3>
            <p>Social network</p>
          </div>
          <FontAwesomeIcon icon={faPen} />
        </div>
        <div className="flex justify-between items-center">
          <img src={linkedInImg} alt="TwitterIcon" className=" object-cover" />
          <div>
            <h3>Twitter</h3>
            <p>Social network</p>
          </div>
          <FontAwesomeIcon icon={faPen} />
        </div>
      </div>
    </section>
  );
}

export default User;
