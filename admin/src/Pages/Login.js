import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Icon, Button, Spin, message } from 'antd';
import request from '../utils/request';
import '../static/style/Pages/login.css';

function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('openId')) {
      props.history.push('/index');
    }
  }, []);

  const checkLogin = () => {
    setIsLoading(true);
    if (!userName) {
      message.error('用户名不能为空');
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    } else if (!password) {
      message.error('密码不能为空');
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    }

    let dataProps = {
      userName: userName,
      password: password
    };

    request({
      method: 'post',
      url: 'checkLogin',
      data: dataProps
    }).then(
      res => {
        setIsLoading(false);
        if (res.data === '登录成功') {
          localStorage.setItem('openId', res.openId);
          props.history.push('/index');
        } else {
          message.error('用户名密码错误');
        }
      }
    ).catch(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="login-div">
      <Spin spinning={isLoading}>
        <Card title="Blog System Login" bordered={true} style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter your username"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setUserName(e.target.value); }}
            onPressEnter={checkLogin}
          />
          <br /><br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setPassword(e.target.value); }}
            onPressEnter={checkLogin}
          />
          <br /><br />
          <Button type="primary" size="large" block onClick={checkLogin}> Login </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
