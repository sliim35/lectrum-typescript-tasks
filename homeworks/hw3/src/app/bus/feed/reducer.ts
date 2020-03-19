// Types
import * as types from './types';

type feedStateType = {
    isFetching: boolean;
    starships: types.StarshipsType;
};

const initialState: feedStateType = {
    starships: [],
    isFetching: false,
};

const neverAction = (action: never) => {};

export const feedReducer = (
    state = initialState,
    action: types.StarshipsActionTypes,
) => {
    switch (action.type) {
        case types.START_FETCHING:
            return { ...state, isFetching: true };

        case types.STOP_FETCHING:
            return { ...state, isFetching: false };

        case types.FILL_STARSHIPS:
            return { ...state, starships: action.payload };

        case types.FETCH_STARSHIPS_ASYNC:
            return state;

        default:
            neverAction(action);
    }

    return state;
};
