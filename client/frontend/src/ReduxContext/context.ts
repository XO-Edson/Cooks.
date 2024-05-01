import { createSlice } from "@reduxjs/toolkit";

type User = {
  username: string;
  email: string;
  friends: string[];
};

type Post = {
  _id: string;
  title: string;
  content: string;
};

export type InitialState = {
  mode: string;
  user: User | null;
  token: string | null;
  posts: Post[];
};

const initialState: InitialState = {
  mode: "dark",
  user: null,
  token: null,
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
    },
    setLogout: (state) => {
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
