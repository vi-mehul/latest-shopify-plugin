import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./components/DefaultLayout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./components/Login/Login'));
const Register = React.lazy(() => import('./components/Register/Register'));
const Page404 = React.lazy(() => import('./components/Page404/Page404'));
const Page500 = React.lazy(() => import('./components/Page500/Page500'));

// const Defaultfilter = React.lazy(() => import('./views/Settings/Defaultfilter/Defaultfilter'));
// const Customfilter = React.lazy(() => import('./views/Settings/Customfilter/Customfilter'));
// const Productfilter = React.lazy(() => import('./views/Settings/Productfilter/Productfilter'));
// const SortingOptions = React.lazy(() => import('./views/Settings/SortingOptions/SortingOptions'));
// const PagingOptions = React.lazy(() => import('./views/Settings/PagingOptions/'));


const App = (props) => {

  
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />

              {/* <Route exact path="/settings/Defaultfilter" name="Defaultfilter" render={props => <Defaultfilter {...props}/>} />
              <Route exact path="/settings/Customfilter" name="Customfilter" render={props => <Customfilter {...props}/>} />
              <Route exact path="/settings/Productfilter" name="Productfilter" render={props => <Productfilter {...props}/>} />
              <Route exact path="/settings/SortingOptions" name="SortingOptions" render={props => <SortingOptions {...props}/>} />
              <Route exact path="/settings/PagingOptions" name="PagingOptions" render={props => <PagingOptions {...props}/>} /> */}
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  
}

export default App;
