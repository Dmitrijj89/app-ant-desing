import React, { Component } from 'react';
import TablePage from '../components/Table';
import { connect } from 'react-redux';

const Table =({data})=> {

	return(
        
            <TablePage />
        
      );
}

const mapStateToProps =(state)=> {
  return {
    data: state.app.data,
  }
}
const mapDispatchToProps =(dispatch)=> {
  return {
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);