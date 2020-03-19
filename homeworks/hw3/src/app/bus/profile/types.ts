export type ProfileType = {
    firstName: string;
    lastName: string;
};

export const FILL_PROFILE = 'FILL_PROFILE';
type ProfileFillActionType = {
    type: typeof FILL_PROFILE;
    payload: ProfileType;
};

export const START_FETCHING = 'START_FETCHING';
type StartFetchingActionType = {
    type: typeof START_FETCHING;
};

export const STOP_FETCHING = 'STOP_FETCHING';
type StopFethingActionType = {
    type: typeof STOP_FETCHING;
};

export type ProfileActionTypes =
    | ProfileFillActionType
    | StartFetchingActionType
    | StopFethingActionType;
