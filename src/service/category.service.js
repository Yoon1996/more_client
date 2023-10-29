import axios from "axios";
import { env } from "../evnironment/environment"


// const baseUrl = `${process.env.REACT_APP_HOST}/category`
const baseUrl = `${env.hosturl}/category`

//카테고리 생성
export const categoryCreate = (params) => {
    return axios.post(`${baseUrl}/create_category`, params)
}

//카테고리 보여주기
export const viewCategories = () => {
    return axios.get(`${baseUrl}/categories`)
}

//카테고리 삭제하기
export const categoryDelete = (categoryId) => {
    return axios.delete(`${baseUrl}/delete_category/${categoryId}`)
}
