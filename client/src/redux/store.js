import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import ciudadesReducer from './ciudadesDucks';
import reservacionesReducer from './reservacionesDucks';

const rootReducer = combineReducers({
    ciudades: ciudadesReducer,
    reservaciones: reservacionesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store=createStore(rootReducer, composeEnhancers(applyMiddleware(thunk) ));
    return store;
}
