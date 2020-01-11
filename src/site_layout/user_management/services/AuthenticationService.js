import axios from 'axios';

const API_URL = 'http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        
        return axios.get(`${API_URL}/auth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    createBasicAuthToken(username, password) {
        let basicAuth = 'Basic ' + window.btoa(username + ":" + password)

        return basicAuth
    }

    registerSuccessfulLogin(username, password) {

        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        console.log("you are now logged in as: ")
        console.log(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME))
        console.log("\n\n\n\n\n")
        sessionStorage.setItem("USER_TOKEN", this.createBasicAuthToken(username, password))
        this.setupAxiosInterceptors(sessionStorage.getItem("USER_TOKEN"))
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()
