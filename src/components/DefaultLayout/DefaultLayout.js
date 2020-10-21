import React, {  Suspense } from 'react';
import {  BrowserRouter as Router ,Redirect , Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'
import DefaultAside from './DefaultAside'
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
// sidebar nav config
import navigation from '../../_nav';
// routes config
 import routes from '../../routes';

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
// const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
// const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = (props) => {
console.log("fwegagagr", navigation)
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
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/> 
            <Router>
            <Container fluid>
              <Suspense fallback={loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    {console.log("fggergerasr", route)}
                    return route.component ? (

                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/settings/Filters" />
                </Switch>
              </Suspense>
            </Container>
            </Router>
          </main>
          <AppAside fixed>
            <Suspense >
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }


export default DefaultLayout;
