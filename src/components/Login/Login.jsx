import React, {  Suspense } from 'react';
import LoginView from '../../views/Pages/Login/LoginView';
import {  BrowserRouter as Router ,Redirect , Route, Switch } from 'react-router-dom';
import DefaultHeader from '../DefaultLayout/DefaultHeader'
import { Container } from 'reactstrap';
import navigation from '../../_nav';
import routes from '../../routes';
import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
  } from '@coreui/react';


const Login = (props) => {
    const loading = () => 
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
    const signOut =(e) => {
        e.preventDefault()
        props.history.push('/login')
      }
    return (
        <div className="app">
        <AppHeader fixed>
          <Suspense fallback={loading()} >
            <DefaultHeader onLogout={e=>signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense >
              
            <AppSidebarNav navConfig={navigation} {...props} />
           
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          
          </div>
        <LoginView {...props} /> 
       
        </div>
    )
}


export default Login;