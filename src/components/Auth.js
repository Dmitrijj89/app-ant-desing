import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import T from 'prop-types';

const Div = styled.div`
max-width: 400px;
margin: 10rem auto;`;

const P = styled.p`
color: red;
position: fixed
margin-top: 6rem;;`;

const isEmail = /^[A-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
  
  class Auth extends Component {
  
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.logIn( values )
          }
        });
      }
    
      render() {
        const { getFieldDecorator } = this.props.form;
        const { errorMsg } = this.props;
        return (
           <Div>
             {errorMsg && <P>{errorMsg}</P>}
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('mail', {
                    rules: [{ required: true, pattern:isEmail, message: 'Введите корректный email!' }],
                })(
                    <Input prefix={<Icon type="mail"  style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, min:5, message: 'Введите корректный пароль!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Войти
                </Button>
                </Form.Item>
            </Form>
          </Div>
        );
      }
  }
  const AuthForm = Form.create({ name: 'normal_login' })(Auth);

  Auth.propTypes = {
    logIn: T.func.isRequired,
    errorMsg: T.string,
  }

  export default AuthForm;