// Types
import * as types from './types';

const fillProfile = (payload: types.ProfileType): types.ProfileActionTypes => {
    return {
        type: types.FILL_PROFILE,
        payload,
    };
};

const startFetching = (): types.ProfileActionTypes => ({
    type: types.START_FETCHING,
});

const stopFetching = (): types.ProfileActionTypes => ({
    type: types.STOP_FETCHING,
});

export const profileActions = {
    fillProfile,
    startFetching,
    stopFetching,
};
