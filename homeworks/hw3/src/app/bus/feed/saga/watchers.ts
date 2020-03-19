// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { SagaIterator } from '@redux-saga/core';
import * as types from '../types';

// Workers
import { fetchStarships } from './workers';

function* watchFetchStarships(): SagaIterator {
    yield takeEvery(types.FETCH_STARSHIPS_ASYNC, fetchStarships);
}

export function* watchFeed(): SagaIterator {
    yield all([call(watchFetchStarships)]);
}
