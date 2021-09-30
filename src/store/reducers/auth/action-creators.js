import { SET_AUTH, SET_IS_LOADING, SET_USER } from "../action-types";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { message } from "antd";

export const AuthActionCreators = {
    setUser: (user) => {
        return { type: SET_USER, payload: user }
    },
    setIsAuth: (auth) => {
        return { type: SET_AUTH, payload: auth }
    },
    setIsLoading: (isLoading) => {
        return { type: SET_IS_LOADING, payload: isLoading }
    },

    login: (email, password) => async (dispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(AuthActionCreators.setUser({ email: user.email, uid: user.uid }));
                dispatch(AuthActionCreators.setIsAuth(true));
                dispatch(AuthActionCreators.setIsLoading(false));
            })
            .catch((error) => {
                message.error("Неправильный логин или пароль");
                dispatch(AuthActionCreators.setIsLoading(false));
            });
    },

    logout: () => async (dispatch) => {
        auth.signOut();
        dispatch(AuthActionCreators.setUser({}));
        dispatch(AuthActionCreators.setIsAuth(false));
    },

    registration: (email, password) => async (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(AuthActionCreators.login(email, password));
            })
            .catch((error) => {
                message.error(error.message);
            });
    },

    signedInUser: () => async (dispatch) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(AuthActionCreators.setUser({ email: user.email, uid: user.uid }));
                dispatch(AuthActionCreators.setIsAuth(true));
            }
        })
    }
}