import { createSlice } from '@reduxjs/toolkit'

export const doc = createSlice({
    name: 'doc',
    initialState: {
        user: {
            isLoggedIn: false,
            name: "something",
            email: "something",
            id: 4,
            loading: true
        }
    },




    reducers: {

        login: (state, action) => {
            state.user.isLoggedIn = true
            state.user.name = action.payload.name
            state.user.email = action.payload.email
            state.user.id = action.payload.id
            state.user.loading = false
        },

        logout: (state) => {
            localStorage.clear();
            state.user.isLoggedIn = false
            state.user.name = ""
            state.user.email = ""
            state.user.id = 0
            state.user.loading = false
        },

        setUser: (state, action) => {
            state.user = action.payload
        },

        setLoading: (state, action) => {
            state.user.loading = action.payload
        }
    },
})

export const { login, logout, setUser, setLoading } = doc.actions
export default doc.reducer