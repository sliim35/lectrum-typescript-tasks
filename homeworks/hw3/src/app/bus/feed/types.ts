export type ResponseWithStarhipsType = {
    count: number;
    next?: string;
    previous?: string;
    results: StarshipsType;
};

export type StarshipType = {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
};

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
