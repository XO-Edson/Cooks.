import { useSelector } from "react-redux";
import CreatePosts from "./CreatePost";
import Posts from "./Posts";
import User from "./user";
import { InitialState } from "../../ReduxContext/context";

type stateType = {
  auth: InitialState;
};
function HomePage() {
  const { user } = useSelector((state: stateType) => state.auth);

  return (
    <section className="grid p-4 grid-cols-3 gap-x-4">
      <User />
      <div>
        <CreatePosts />
        <Posts userId={user?._id} isProfile={false} />
      </div>
    </section>
  );
}

export default HomePage;
