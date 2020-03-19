// Types
import * as types from './types';

const fillStarships = (
    starships: types.StarshipsType,
): types.StarshipsActionTypes => ({
    type: types.FILL_STARSHIPS,
    payload: starships,
});

const fetchStarshipsAsync = (): types.StarshipsActionTypes => ({
    type: types.FETCH_STARSHIPS_ASYNC,
});

const startFetching = (): types.StarshipsActionTypes => ({
    type: types.START_FETCHING,
});

const stopFetching = (): types.StarshipsActionTypes => ({
    type: types.START_FETCHING,
});

export const feedActions = {
    fillStarships,
    fetchStarshipsAsync,
    startFetching,
    stopFetching,
};
