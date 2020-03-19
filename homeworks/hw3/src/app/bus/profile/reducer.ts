// Types
import * as types from './types';

export type ProfileStateType = {
    isFetching: boolean;
};

const initialState: ProfileStateType & types.ProfileType = {
    firstName: 'Уолтер',
    lastName: 'Уайт',
    isFetching: false,
};

const neverAction = (action: never) => {};

export const profileReducer = (
    state = initialState,
    action: types.ProfileActionTypes,
) => {
    switch (action.type) {
        case types.FILL_PROFILE:
            return { ...state, ...action.payload };

        case types.START_FETCHING:
            return { ...state, isFetching: true };

        case types.STOP_FETCHING:
            return { ...state, isFetching: false };

        default:
            neverAction(action);
    }

    return state;
};
