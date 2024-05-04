import { createSlice } from "@reduxjs/toolkit";

export type UserType = {
  _id: any;
  firstName: string;
  lastName: string;
  email: string;
  friends: string[];
  password: string;
  location: string;
  occupation: string;
  picturePath: string;
  viewedProfile: number;
  impressions: number;
};

type PostType = {
  _id: string;
  title: string;
  content: string;
};

export type InitialState = {
  mode: string;
  user: UserType | null;
  token: string | null;
  posts: PostType[];
};

const initialState: InitialState = {
  mode: "dark",
  user: null,
  token: "",
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log(state.user, state.token);
    },

    setLogout: (state) => {
      console.log("clk");

      console.log(state.token);

      state.user = null;
      state.token = null;
    },

    setFriend: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends as string[];
      } else {
        console.error("user friends non existent ");
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriend, setPost, setPosts } =
  authSlice.actions;

export default authSlice.reducer;
