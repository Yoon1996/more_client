import { AccountBookFilled } from '@ant-design/icons'
import { configureStore, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSelector } from 'react-redux'

const categoryInitialState = []



export const { name, actions, reducer: categoryListReducer } = createSlice({
    name: 'category',
    initialState: categoryInitialState,
    reducers: {
        // loginUser: (currentUserInfo, action) => {
        //     if (action?.payload?.accessToken) {
        //         setAccessToken(action?.payload?.accessToken) //로컬스토리지에 토큰 저장
        //         const accessToken = getAccessToken()
        //         axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        //         //header 에 토큰 저장
        //     }
        //     console.log('actionpayload', action.payload)
        //     return { ...currentUserInfo, ...action.payload }
        // },
        //     updateUser: (currentUserInfo, action) => ({...currentUserInfo, ...action.payload}),
        //     logoutUser: () => {
        //         clearAccessToken();
        //         axios.defaults.headers.common['Authorization'] = null
        //         return userInitialState
        //     }

        updateCategory: (currentCategory, action) => {
            if (action?.payload?.length !== 0) {
                return [...action.payload]
            } else {
                return []
            }
            //카테고리 저장을 눌렀을때 헤더의 카테고리 배열
        }


    }
})



export const { updateCategory } = actions