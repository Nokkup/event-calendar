import { SET_EVENTS, ADD_EVENT } from "../action-types";
import { dbRef, database } from "../../../firebase";
import { ref, set, get, child } from "firebase/database";
import { MD5 } from "crypto-js";


export const EventActionCreators = {
    setEvents: (events) => {
        return { type: SET_EVENTS, payload: events }
    },

    addEvent: (event) => {
        return { type: ADD_EVENT, payload: event }
    },

    uploadEvents: () => async (dispatch, getState) => {
        const { auth, event } = getState();
        const emailHash = MD5(auth.user.email).toString();
        const newEvents = event.events.slice();

        set(ref(database, emailHash), {
            events: newEvents
        }).then(() => {
            dispatch(EventActionCreators.setEvents(newEvents));
        }).catch((error) => {
            console.error.toString(error);
        })

    },

    getEvents: () => async (dispatch, getState) => {
        const { auth } = getState();
        const emailHash = MD5(auth.user.email).toString();

        get(child(dbRef, emailHash)).then((snapshot) => {
            const events = snapshot.exists()
                ? snapshot.val().events
                : [];
            dispatch(EventActionCreators.setEvents(events));
        }).catch((error) => {
            console.error(error);
        });
    }
}