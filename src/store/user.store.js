import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { clearAccessToken, getAccessToken, setAccessToken } from '../util/localstorage.util'

const userInitialState = {
    isInit: false
}

export const { name, actions, reducer: userReducer } = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        loginUser: (currentUserInfo, action) => {
            if (action?.payload?.accessToken) {
                setAccessToken(action?.payload?.accessToken) //로컬스토리지에 토큰 저장
                const accessToken = getAccessToken()
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                //header 에 토큰 저장
            }
            return { ...currentUserInfo, ...action.payload, isInit: true }
        },
        updateUser: (currentUserInfo, action) => ({ ...currentUserInfo, ...action.payload }),
        logoutUser: () => {
            clearAccessToken();
            axios.defaults.headers.common['Authorization'] = null
            return { ...userInitialState, isInit: true }
        },
        userInit: (currentUserInfo, action) => {
            return { ...currentUserInfo, isInit: action.payload.isInit }
        }
    }
})



export const { updateUser, loginUser, logoutUser, userInit, dddd } = actions