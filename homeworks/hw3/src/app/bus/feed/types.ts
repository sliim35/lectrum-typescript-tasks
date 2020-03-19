export type StarshipType = {};
export type StarshipsType = StarshipType[];

export const FILL_STARSHIPS = 'FILL_STARSHIPS';
type FillStarshipsActionType = {
    type: typeof FILL_STARSHIPS;
    payload: StarshipsType;
};

export const START_FETCHING = 'START_FETCHING';
type StartFetchingActionType = {
    type: typeof START_FETCHING;
};

export const STOP_FETCHING = 'STOP_FETCHING';
type StopFetchingActionType = {
    type: typeof STOP_FETCHING;
};

export const FETCH_STARSHIPS_ASYNC = 'FETCH_STARSHIPS_ASYNC';
type FetchStarhipsAsyncActionType = {
    type: typeof FETCH_STARSHIPS_ASYNC;
};

export type StarshipsActionTypes =
    | FillStarshipsActionType
    | StartFetchingActionType
    | StopFetchingActionType
    | FetchStarhipsAsyncActionType;
