import { ADD_EVENT, SET_EVENTS } from "../action-types";

const initialState = {
    events: []
}

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EVENTS:
            return { ...state, events: action.payload };
        case ADD_EVENT: {
            return { ...state, events: [...state.events, action.payload] }
        }
        default:
            return state;
    }
}