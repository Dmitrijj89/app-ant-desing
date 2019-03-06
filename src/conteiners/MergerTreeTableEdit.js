import React from 'react';
import TreePage from '../components/Tree';
import EditableTable from '../components/TableEdit';
import { connect } from 'react-redux';

const MergerTreeTableEdit =({data})=> {

	return(
        <>
            <TreePage />
            <EditableTable />
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(MergerTreeTableEdit);
