import React from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Tag, Checkbox, Button } from "antd";
import { data } from "../api";
import { withRouter } from 'react-router-dom';
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
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
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
                    rules: [{
                        required: true,
                        message: `Please Input ${title}!`
                      }],
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

    this.state = { data, editingKey: "" };
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
      const current = data.filter(item => item.id === id);
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
      const newData = [...this.state.data];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
        this.handlePushList1();
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
        this.handlePushList1();
      }
    });
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
          inputType: col.dataIndex === "age" ? "number" : "text",
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
  getData: T.func.isRequired,
}

export default withRouter(EditableTable);
