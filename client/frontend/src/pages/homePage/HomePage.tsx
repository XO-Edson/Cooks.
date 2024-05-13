import { useSelector } from "react-redux";
import CreatePosts from "./CreatePost";
import Posts from "./Posts";
import User from "./user";
import { InitialState } from "../../ReduxContext/context";
import Advert from "./Advert";
import FriendList from "./FriendList";

type stateType = {
  auth: InitialState;
};
function HomePage() {
  const { user } = useSelector((state: stateType) => state.auth);

  return (
    <section className="homepageGrid gap-x-4 p-3">
      <User />

      <div>
        <CreatePosts />
        <Posts userId={user?._id} isProfile={false} />
      </div>

      <div className="hidden md:block">
        <Advert />
        <FriendList userId={user?._id} />
      </div>
    </section>
  );
}

export default HomePage;
