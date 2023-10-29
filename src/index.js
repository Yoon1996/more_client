import { configureStore } from '@reduxjs/toolkit';
import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { categoryListReducer } from './store/category.store';
import { RecipeReducer } from './store/recipe.store';
import { userReducer } from './store/user.store';

const rootReducer = combineReducers({
  user: userReducer,
  categoryList: categoryListReducer,
  recipe: RecipeReducer,
})

const rootStore = configureStore({
  reducer: rootReducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
