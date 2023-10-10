import { combineReducers, createStore } from 'redux';
import taskReducer from './reducer';

const store = createStore(combineReducers({ task: taskReducer }));

export default store;
