import { SET_AUTH, SET_ERROR, SET_IS_LOADING, SET_USER } from "../action-types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

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
    setError: (error) => {
        return { type: SET_ERROR, payload: error }
    },

    login: (email, password) => async (dispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(AuthActionCreators.setUser({ email: user.email, uid: user.uid }));
                dispatch(AuthActionCreators.setIsAuth(true));
                dispatch(AuthActionCreators.setError(""));
                dispatch(AuthActionCreators.setIsLoading(false));
            })
            .catch((error) => {
                dispatch(AuthActionCreators.setError("Неправильный логин или пароль"));
            });
    },
    logout: () => async (dispatch) => {
        auth.signOut();
        dispatch(AuthActionCreators.setUser({}));
        dispatch(AuthActionCreators.setIsAuth(false));
    },
}