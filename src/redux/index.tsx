// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
// import authReducer from './authReducer';
import reducer from './reducer';


// Redux: Root Reducer
const rootReducer = combineReducers({
  // authReducer: authReducer,
  reducer:reducer
});

// Exports
export default rootReducer;