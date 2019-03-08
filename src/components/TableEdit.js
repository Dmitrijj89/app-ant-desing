import React from "react";
import { Table, Input, Popconfirm, Form, Tag, Checkbox, Button } from "antd";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import {updateData} from "../actions/AppAction";
import { isEmail } from '../selectors';
import T from 'prop-types';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

  getInput = () => {
    if (this.props.inputType === "checkbox") {
      return <Checkbox />;
    }
    return <Input />;
  };

  getValid = (dataIndex) => {
    const initRules = [{
      required: true,
      message: 'Поле не может быть пустым!',
    }];

    if (dataIndex === 'name') {
      initRules.push({
        min: 2,
        message: 'Слишком короткая запись!',
      });
    }

    if (dataIndex === 'email') {
      initRules.push({
        type: 'email',
        pattern: isEmail,
        message: 'Введите правильный Email !',
      });
    }
    
    if (dataIndex === 'addresses') {
      initRules.push({
        validator: this.addressesValidate,
      });
    }
    return initRules;
  }

  addressesValidate = (rule, addresses, callback) => {
    const errors = [];
    if (typeof (addresses) === 'string') {
      addresses.split(',').forEach((addresses) => {
        if (! /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(addresses)) {
          errors.push(
            new Error('Введите корректный адрес сайта!'),
          );
        };
      });
    }
    callback(errors);
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
  
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: this.getValid(dataIndex),
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: this.props.data, editingKey: "" };
    this.columns = [
      {
        title: "ID",
        dataIndex: "id",
        width: "10%",
        editable: false
      },
      {
        title: "Name",
        dataIndex: "name",
        min:2,
        width: "25%",
        editable: true
      },
      {
        title: "Condition",
        dataIndex: "condition",
        width: "10%",
        editable: true,
        render: (text, record) => <Checkbox
          defaultChecked = {record.condition} disabled 
          />
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "30%",
        editable: true
      },
      {
        title: "Addresses",
        dataIndex: "addresses",
        width: "40%",
        editable: true,
        render: addresses => (
          <span>
            {addresses.map(address => (
              <Tag color="blue" key={address}>
                {address}
              </Tag>
            ))}
          </span>
        )
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.id)}
                        style={{ marginRight: 8 }}
                      >
                        Сохранить
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Вы уверены?"
                    onConfirm={() => this.cancel(record.id)}
                  >
                    <a>Отмена</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.id)}>Редактировать</a>
              )}
            </div>
          );
        }
      }
    ];
  }

  isEditing = record => record.id === this.state.editingKey;

  getData = () => {

    const newData = [];

    this.props.checks.forEach(id => {
      const current = this.props.data.filter(item => item.id === id);
      newData.push(current[0]);
    });

    return newData;
  };

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }  
        const addresses = this.coversionValueInput(row);
        this.setState({ editingKey: "" });
        this.props.updateData({ ...row, id, addresses});
        this.handlePushList1();
    });
  }

  coversionValueInput = (row) => {
    if (row.addresses && typeof (row.addresses) === 'string') {
      return row.addresses.split(',');
    }
    return row
  }

  handlePushList1=()=> {
    this.props.history.push('/list1');
  }

  edit(id) {
    this.setState({ editingKey: id });
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "condition" ? "checkbox" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <>
        <Table
          rowKey={data => data.id}
          components={components}
          bordered
          dataSource={this.getData()}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel
          }}
        />
        <Button type="primary" onClick={this.handlePushList1} >
            К списку
        </Button>
      </>
    );
  }
}

EditableTable.propTypes = {
  data: T.arrayOf(
    T.shape({
      id: T.number.isRequired,
      name: T.string.isRequired,
      condition: T.bool.isRequired,
      email: T.string.isRequired,
      addresses: T.arrayOf(T.string),
    }),
  ).isRequired,
  getData: T.func,
  record: T.object,
  editable: T.bool,
  inputType: T.string,
  dataIndex: T.string,
  title: T.string,
}

const mapStateToProps = state => {
  return {
    data: state.app.data
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateData(newData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditableTable));

