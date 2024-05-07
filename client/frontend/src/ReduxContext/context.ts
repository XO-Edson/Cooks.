import { createSlice } from "@reduxjs/toolkit";

export type UserType = {
  _id: any;
  firstName: string;
  lastName: string;
  email: string;
  friends: UserType[];
  password: string;
  location: string;
  occupation: string;
  picturePath: string;
  viewedProfile: number;
  impressions: number;
};

export type PostType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  title: string;
  content: string;
  description: string;
  likes: boolean;
  comment: string[];
  userPicturePath: string;
  picturePath: string;
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
      state.user = null;
      state.token = null;
    },

    setFriend: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload;
      } else {
        console.error("user friends non existent ");
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    setPost: (state, action) => {
      console.log(state);

      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriend, setPost, setPosts } =
  authSlice.actions;

export default authSlice.reducer;
