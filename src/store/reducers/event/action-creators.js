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

    uploadEvents: (user, events, newEvent) => async dispatch => {
        try {
            const emailHash = MD5(user.email).toString();

            set(ref(database, emailHash), {
                events: [...events, newEvent]
            });
            dispatch(EventActionCreators.addEvent(newEvent));

        } catch (error) {
            console.error(error);
        }
    },

    getEvents: (user) => async dispatch => {
        try {
            let events = [];
            const emailHash = MD5(user.email).toString();

            await get(child(dbRef, emailHash)).then((snapshot) => {
                if (snapshot.exists()) {
                    events = snapshot.val().events;
                }
            }).catch((error) => {
                console.error(error);
            });

            dispatch(EventActionCreators.setEvents(events));

        } catch (error) {
            console.error(error);
        }
    }
}