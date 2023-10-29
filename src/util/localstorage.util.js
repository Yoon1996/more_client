export const setAccessToken = (token) => {
    window.localStorage.setItem('accessToken', token)
}

export const getAccessToken = () => {
    return window.localStorage.getItem('accessToken')
}

export const clearAccessToken = () => {
    return window.localStorage.removeItem('accessToken')
}