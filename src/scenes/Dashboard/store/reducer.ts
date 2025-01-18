import { Routine } from 'redux-saga-routines';
import { ReducerHandlers } from '../../../store/types/reducer.handlers';
import { DashboardState } from './types/dashboard.state';
import { editAccountRoutine, findAccountRoutine } from './routines';
import { accountUpdate } from './handlers';

const initialState: DashboardState = {
    account: null
};

const handlers: ReducerHandlers<DashboardState> = {
    [findAccountRoutine.SUCCESS]: accountUpdate,
    [findAccountRoutine.FAILURE]: accountUpdate,
    [editAccountRoutine.SUCCESS]: accountUpdate,
    [editAccountRoutine.FAILURE]: accountUpdate
};

const DashboardReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: Routine<any> = {}
): DashboardState => {
    const handler = handlers[type];
    if (handler) {
        return handler(state, payload);
    }
    return state;
};

export default DashboardReducer;
