import axios from "axios";
import { env } from "../evnironment/environment"

const baseUrl = `${process.env.REACT_APP_HOST}/mail`
// const baseUrl = `${env.hosturl}/mail`

//메일보내기ㄴ
export const mailAuthenticate = (params) => {
    return axios.post(`${baseUrl}/mail`, params)
}