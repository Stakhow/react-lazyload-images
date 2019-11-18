import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import initialState from './initial-state';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

const store = createStore(reducer, initialState, applyMiddleware(thunk));

store.subscribe(()=>{
	console.log(store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
