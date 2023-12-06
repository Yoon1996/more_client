import axios from "axios";
import { env } from "../evnironment/environment"

// const baseUrl = `${env.hosturl}/users`
const baseUrl = `${process.env.REACT_APP_HOST}/users`

//닉네임 중복
export const emailCheck = (email) => {
    return axios.get(`${baseUrl}/email-check?email=${email}`)
}

//토큰
export const tokenVerify = () => {
    return axios.get(`${baseUrl}/token-verify`)
}

//회원가입
export const signUp = (params) => {
    return axios.post(`${baseUrl}/sign-up`, params)

}

//로그인
export const loginCheck = (params) => {
    return axios.post(`${baseUrl}/login`, params)
}

//소셜로그인
export const socialLogin = (params) => {
    return axios.post(`${baseUrl}/social-login`, params)
}

//로그아웃
export const logout = () => {
    return axios.get(`${baseUrl}/logout`)
}

//회원정보 수정
export const infoUpdate = (userId, params) => {
    return axios.put(`${baseUrl}/user/${userId}`, params)
}

//비밀번호 체크
export const pwCheck = (params) => {
    return axios.post(`${baseUrl}/pw-check/`, params)
}

//탈퇴하기
export const withDraw = (params) => {
    return axios.put(`${baseUrl}/user/`, params)
}