import { createSlice } from '@reduxjs/toolkit'


const recipeInitialState = [

]

export const { name, actions, reducer: RecipeReducer } = createSlice({
    name: 'recipe',
    initialState: recipeInitialState,
    reducers: {
        setRecipes: (currentRecipes, action) => {
            if (action?.payload?.length !== 0) {
                return [...action.payload]
            } else {
                return []
            }
        },
        setRecipe: (currentRecipes, action) => {
            console.log(action.payload)
        }
    }
})



export const { setRecipes, setRecipe } = actions