import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    loading: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },

        setLogout: (state) => {
            state.user = null
            state.token = null
        },

        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends
            }
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post

                return post
            })
            state.posts = updatedPosts
        },
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPost, setPosts, setLoading } = authSlice.actions

export default authSlice.reducer
