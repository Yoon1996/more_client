import axios from "axios";
import { env } from "../evnironment/environment"

// const baseUrl = `${env.hosturl}/url`
const baseUrl = `${process.env.REACT_APP_HOST}/url`

//url send
export const sendUrl = (body) => {
    return axios.post(`${baseUrl}/send-url`, body)
}

export const uploadToS3 = (url, file) => {
    return axios.put(`${baseUrl}/send-toS3`, url, file)
}