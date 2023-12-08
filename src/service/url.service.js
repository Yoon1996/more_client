import axios from "axios";
import { env } from "../evnironment/environment"

const baseUrl = `${env.hosturl}/url`
// const baseUrl = `${process.env.REACT_APP_HOST}/recipe`

//url send
export const sendUrl = (params) => {
    return axios.post(`${baseUrl}/send-url`, params)
}
