import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from './conteiners/PrivateRoute';
//import LoginContainer from './containers/LoginContainer';
import AuthForm from './conteiners/AuthConteiner';
import Table from './conteiners/TableConteiner';
import MergerTreeTableEdit from './conteiners/MergerTreeTableEdit';
import Logout from './components/LogOut';
import {connect} from 'react-redux';
import './App.css';

class App extends Component {
  
  render() {

    
    let links = (
      <li>
       <NavLink to="/login" exact ></NavLink>
     </li>
     )
 
     if (this.props.user) {
       links = (
            <React.Fragment>
              <li>
                 <NavLink to="/list1">Страница 1</NavLink>
              </li>
              <li>
                 <NavLink to="/list2">Страница 2</NavLink>
              </li>
              <li>
                  <NavLink to="/logout">Выйти</NavLink>
              </li>
        </React.Fragment>
       )
     } 
     
     let routes = (
      <Switch>
        <Route exact path="/login" component={AuthForm} />
        <Redirect to="/login" />
      </Switch>
    )

    if (this.props.user) {
      routes = (
       <Switch> 
        <PrivateRoute path="/list1" component={Table} />
        <PrivateRoute path="/list2/:clientId" component={MergerTreeTableEdit} />
        <PrivateRoute path="/logout" component={Logout} />
        <Redirect to="/list1" />
      </Switch>
      )
    }


    return (
            <div>
              <ul>
                { links }
              </ul>
            <hr/>
              { routes }
            </div>
          );
  }
}

function mapStateToProps(state) {
  return {
    user: !!state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
   
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App));
