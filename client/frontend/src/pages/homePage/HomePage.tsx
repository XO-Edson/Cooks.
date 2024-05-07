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
    <section className="grid grid-cols-[100px_1fr_300px] gap-x-4 p-3">
      <User />

      <div>
        <CreatePosts />
        <Posts userId={user?._id} isProfile={false} />
      </div>

      <div>
        <Advert />
        <FriendList userId={user?._id} />
      </div>
    </section>
  );
}

export default HomePage;
