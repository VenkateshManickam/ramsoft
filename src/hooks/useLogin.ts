import { IUserCredential } from "../interface";

const LOGGED_IN = 'loggedIn';
const USERNAME = 'username';
const PASSWORD = 'password';

export default function useLogin() {
    const isLoggedin = localStorage.getItem(LOGGED_IN) === 'Y';

    const setLoggedin = () => localStorage.setItem(LOGGED_IN, 'Y');

    const clearLoggedin = () => localStorage.removeItem(LOGGED_IN);

    const setUserCredentials = ({ username, password }: IUserCredential) => {
        localStorage.setItem(USERNAME, username);
        localStorage.setItem(PASSWORD, password);
    }

    const checkUserCredentials = ({ username, password }: IUserCredential) => {
        const localUsername = localStorage.getItem(USERNAME);
        const localPassword = localStorage.getItem(PASSWORD);
        if (!localUsername || !localPassword) return false;
        if (localUsername === username && localPassword === password) {
            setLoggedin();
            return true;
        }
        return false;
    }

    return { isLoggedin, setUserCredentials, checkUserCredentials, clearLoggedin };
}