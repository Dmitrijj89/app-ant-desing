import React from "react";
import { Table, Tag, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import T from 'prop-types';

const { Column } = Table;

const TableList = ({ data }) => {
  return (
    <Table dataSource={data} rowKey={data => data.id} >
      <Column
        title="ID"
        dataIndex="id" 
        key="id"
      />
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(name, record) => (
          <Link to={`/list2/${record.id}`}>{name}</Link>
        )}
      />
      <Column 
         title="Condition"
         dataIndex="condition"
         key="condition" 
         render={(text, record) => <Checkbox
          defaultChecked = {record.condition} disabled 
          />}
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
            {addresses.map(address => (
              <Tag color="blue" key={address}>
                {address}
              </Tag>
            ))}
          </span>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Link to={`/list2/${record.id}`}>Редактировать</Link>
        )}
      />
    </Table>
  );
};

TableList.propTypes = {
  data: T.arrayOf(
    T.shape({
      id: T.number.isRequired,
      name: T.string.isRequired,
      condition: T.bool.isRequired,
      email: T.string.isRequired,
      addresses: T.arrayOf(T.string),
    }),
  ).isRequired,
}

const mapStateToProps = state => {
  return {
    data: state.app.data
  };
};

export default connect(
  mapStateToProps,
  null
)(TableList);
