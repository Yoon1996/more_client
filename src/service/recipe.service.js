import axios from "axios";
import { env } from "../evnironment/environment"

const baseUrl = `${env.hosturl}/recipe`
// const baseUrl = `${process.env.REACT_APP_HOST}/recipe`

//카테고리 드롭다운 api
export const categoryDrop = () => {
    return axios.get(`${baseUrl}/getCategory`)
}

//레시피 제목 유효성 api
export const recipeTitleCheck = (recipeName) => {
    return axios.get(`${baseUrl}/recipes/${recipeName}`)
}

//레시피 등록 api
export const create = (params) => {
    return axios.post(`${baseUrl}/create_recipe`, params)
}

//레시피 목록 가져오기
export const getRecipeList = (filter) => {
    return axios.get(`${baseUrl}/recipes?filter=${filter}`)
}
//레시피 검색 목록 가져오기
export const getSearchRecipeList = (search) => {
    return axios.get(`${baseUrl}/recipes?search=${search}`)
}

//레시피 필터링
export const filterRecipe = (categoryId) => {
    return axios.get(`${baseUrl}/recipes/${categoryId}`)
}

//레시피 정보 가져오기
export const getRecipe = (recipeId) => {
    return axios.get(`${baseUrl}/recipe-component/${recipeId}`)
}

//레시피 수정하기
export const editRecipe = (recipeId, params) => {
    return axios.put(`${baseUrl}/recipes/${recipeId}`, params)
}

//레시피 삭제하기
export const deleteRecipe = (recipeId) => {
    return axios.delete(`${baseUrl}/recipes/${recipeId}`)
}