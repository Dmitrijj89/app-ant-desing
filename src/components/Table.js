import React from 'react';
import { Table, Tag } from 'antd';

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
 
 
  
  export default TableList;