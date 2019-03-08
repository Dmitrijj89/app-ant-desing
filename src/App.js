import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from './conteiners/PrivateRoute';
import AuthForm from './conteiners/AuthConteiner';
import Table from './conteiners/TableConteiner';
import MergerTreeTableEdit from './conteiners/MergerTreeTableEdit';
import Logout from './components/LogOut';
import { Button } from "antd";
import {connect} from 'react-redux';
import styled from 'styled-components';
import './App.css';

const P = styled.p`
  margin-left: 85%;`;

class App extends Component {
  
  render() {

    
    let links = (
      
       <NavLink to="/login" exact ></NavLink>
     
     )
 
     if (this.props.user) {
       links = (
            <>
              
                 <NavLink to="/list1"></NavLink>
    
                 <NavLink to="/list2"></NavLink>
           
                <NavLink to="/logout">
                  <P>
                    <Button type="primary" icon="logout">
                       Выйти
                    </Button>
                  </P>
                </NavLink>
            
           </>
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
                { links }

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
