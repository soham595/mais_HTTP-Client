import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
import CustomLoader from "./views/CustomLoader";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      authenticated: localStorage.getItem('isLoggedIn'),
    };
  }
  componentWillMount() {
    this.setState({
      authenticated: localStorage.getItem('isLoggedIn')
    });
    this.setState({
      loading: true
    })
  }

  render() {
    let loader;
    if (this.state.loading) {
      loader = <CustomLoader/>
    }
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={DefaultLayout} />;
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
