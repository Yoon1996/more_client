import axios from "axios";
import { env } from "../evnironment/environment"


const baseUrl = `${process.env.REACT_APP_HOST}/category`
// const baseUrl = `${env.hosturl}/bookmark`

//북마크 지정
export const bookmarkToggle = (params) => {
    return axios.post(`${baseUrl}/bookmark-toggle`, params)
}

//북마크 해제
export const bookmarkDelete = (id) => {
    return axios.delete(`${baseUrl}/delete-bookmark/${id}`)
}