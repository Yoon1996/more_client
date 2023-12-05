import { createSlice } from '@reduxjs/toolkit'

const categoryInitialState = []



export const { name, actions, reducer: categoryListReducer } = createSlice({
    name: 'category',
    initialState: categoryInitialState,
    reducers: {
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