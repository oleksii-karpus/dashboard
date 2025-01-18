import { all } from 'redux-saga/effects';
import rootSaga from '../../../store/sagas';
import authSaga from '../../../scenes/Auth/store/sagas';
import appSaga from '../../../store/app/sagas';
import dashboardSaga from '../../../scenes/Dashboard/store/sagas';

it('rootSaga should run all sagas', () => {
    const generator = rootSaga();
    const result = generator.next().value;

    expect(result).toEqual(all([appSaga(), authSaga(), dashboardSaga()]));
});
