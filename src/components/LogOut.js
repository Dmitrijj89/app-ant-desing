import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logOut} from '../actions/AuthAction';

class Logout extends Component {
	
   static propTypes = {

    logout: PropTypes.func
  }

  componentDidMount() {
    this.props.logOut()
  }

  render() {
    return <Redirect to={'/login'} />
  }
}


function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch(logOut())
  }
}

export default connect(null, mapDispatchToProps)(Logout)