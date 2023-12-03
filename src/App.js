import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import AuthGaurdComponent from './component/auth_gaurd_component';
import CategoryListpage from './page/category_list.page';
import JoinPage from './page/join.page';
import LoginPage from './page/login.page';
import LoginDonePage from "./page/login_done.page";
import MyInfoPage from './page/my_info.page';
import RecipeListpage from './page/recipe_list.page';
import WithdrawPage from './page/withdraw_page';
import { tokenVerify } from './service/user.service';
import { loginUser, userInit } from './store/user.store';
import LoginTemplate from './template/login.template';
import MainTemplate from './template/main.template';
import MyAccountTemplate from './template/my-account.template';
import { clearAccessToken, getAccessToken } from './util/localstorage.util';

function App() {

  console.log('process.env.REACT_APP_HOST: ', process.env.REACT_APP_HOST);

  const dispatch = useDispatch()
  const clientId =
    "926618531398-36t5psht9gd5c2sk9irjdf8vlvltpd22.apps.googleusercontent.com";

  useEffect(() => {

    const accessToken = getAccessToken();

    if (!accessToken) dispatch(userInit({ isInit: true }))


    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    tokenVerify()
      .then(res => {
        dispatch(loginUser({ ...res.data }))
      })
      .catch(error => {
        console.log(error)
        clearAccessToken()
      })
      .finally(() => {
        dispatch(userInit({ isInit: true }))
      })
  }, [])


  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate replace to="/main/recipe_list" />}></Route>
          <Route path='/main' element={
            <AuthGaurdComponent>
              <MainTemplate></MainTemplate>
            </AuthGaurdComponent>}>
            <Route path='recipe_list' element={<RecipeListpage></RecipeListpage>}></Route>
          </Route>
          <Route path='/login' element={<LoginTemplate></LoginTemplate>}>
            <Route path='member_login' element={<LoginPage></LoginPage>}></Route>
            <Route path='member_join' element={<JoinPage></JoinPage>}></Route>
            <Route path="member_login-done" element={<LoginDonePage></LoginDonePage>}></Route>
          </Route>
          <Route path='/my-account' element={<AuthGaurdComponent><MyAccountTemplate></MyAccountTemplate></AuthGaurdComponent>}>
            <Route path='category_list_page' element={<CategoryListpage></CategoryListpage>}></Route>
            <Route path='my_info_page' element={<MyInfoPage></MyInfoPage>}></Route>
            <Route path='withdraw_page' element={<WithdrawPage></WithdrawPage>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
