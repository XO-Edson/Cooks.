import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { InitialState, UserType } from "../../ReduxContext/context";
import FriendList from "../homePage/FriendList";
import CreatePosts from "../homePage/CreatePost";
import Posts from "../homePage/Posts";
import linkedInImg from "../../assets/linkedin.png";
import twitterImg from "../../assets/twitter.png";
import noProfile from "../../assets/no-profile-picture-icon-13.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBriefcase,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

type stateType = {
  auth: InitialState;
};

function Profilepage() {
  const [profile, setProfile] = useState<UserType>();
  const { userId } = useParams();
  const { token } = useSelector((state: stateType) => state.auth);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Error fetching user: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log(data);

      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(profile);

  useEffect(() => {
    getUser();
  }, [userId]);

  if (!profile) return null;

  return (
    <section className="profileGrid gap-x-4 p-3">
      <div>
        <section className="bg-slate-900 p-2 rounded-md h-fit mb-2">
          {/* First-Row */}
          <div className="flex justify-between mb-2 items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate(`/profile/${profile?._id} `)}
            >
              <img
                src={
                  !profile?.picturePath
                    ? noProfile
                    : `http://localhost:3001/assets/${profile.picturePath}`
                }
                alt="userImg"
                className=" object-cover h-[70px] w-[70px] rounded-full mr-4"
              />
              <div>
                <p>
                  {profile?.firstName} {profile?.lastName}
                </p>
                <p>{profile?.friends.length} Friends</p>
              </div>
            </div>
            <div className=" cursor-pointer">
              <FontAwesomeIcon icon={faUser} />
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
                <p>{profile?.location}</p>
              </div>

              <div className=" flex">
                <p className=" mr-6">
                  <FontAwesomeIcon icon={faBriefcase} size="lg" />
                </p>
                <p>{profile?.occupation}</p>
              </div>
            </div>
          </div>

          <div className=" mb-2 flex justify-between">
            <div>
              <p>Who's viewed your profile :</p>
              <p>Impressions on your profile :</p>
            </div>

            <div>
              <p> {profile?.viewedProfile}</p>
              <p> {profile?.impressions}</p>
            </div>
          </div>

          <hr className=" border-gray-700" />

          {/* Third row */}
          <div className=" mt-2">
            <h2 className=" font-bold">Social Profiles</h2>
            <div className="flex justify-between items-center">
              <img
                src={twitterImg}
                alt="TwitterIcon"
                className=" object-cover"
              />
              <div>
                <h3>Twitter</h3>
                <p>Social network</p>
              </div>
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className="flex justify-between items-center">
              <img
                src={linkedInImg}
                alt="TwitterIcon"
                className=" object-cover"
              />
              <div>
                <h3>Twitter</h3>
                <p>Social network</p>
              </div>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </section>

        <FriendList userId={profile?._id} />
      </div>

      <div>
        <CreatePosts />
        <Posts userId={profile?._id} isProfile={true} />
      </div>
    </section>
  );
}

export default Profilepage;
