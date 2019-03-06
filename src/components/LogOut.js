import React, {Component} from 'react';
import T from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logOut} from '../actions/AuthAction';

class Logout extends Component {


  componentDidMount() {
    this.props.logOut()
  }

  render() {
    return <Redirect to={'/login'} />
  }
}

Logout.propTypes = {
  logOut: T.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch(logOut())
  }
}

export default connect(null, mapDispatchToProps)(Logout)