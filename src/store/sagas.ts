import { all } from 'redux-saga/effects';
import authSaga from '../scenes/Auth/store/sagas';
import appSaga from './app/sagas';

export default function* rootSaga() {
    yield all([appSaga(), authSaga()]);
}
