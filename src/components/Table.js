import React from 'react';
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSelected } from '../actions/AppAction';

const { Column } = Table;
//const { data } = this.props;


const TableList =({data})=> {
  const rowSelection = {
    hideDefaultSelections:true,

    };
    return (
  <Table dataSource={data} rowSelection={rowSelection} >
      <Column
        title="ID"
        dataIndex="id"
        key="id"
      />
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        render={ (name, record) => <Link
          to="/list2"
          onClick={() => this.updSelected([record.id])}
        >
          {name}
      </Link>}
      />
    <Column
      title="Condition"
      dataIndex="condition"
      key="condition"
    />
    <Column
      title="Email"
      dataIndex="email"
      key="email"
    />
    <Column
      title="Addresses"
      dataIndex="addresses"
      key="addresses"
      render={addresses => (
        <span>
          {addresses.map(address => <Tag color="blue" key={address}>{address}</Tag>)}
        </span>
     )}
    />
    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <span>
          <a href="javascript:;">Редактировать</a>
        </span>
      )}
    />
  </Table>
    );
 }
 
 
  
 export default connect(state => ({
  data: state.app.data,
  selected: state.selected,
}), { updSelected: updateSelected })(TableList);