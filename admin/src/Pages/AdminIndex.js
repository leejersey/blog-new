import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Icon, message } from 'antd';
import { Route } from 'react-router-dom';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
import WorkPlace from './WorkPlace';
import request from '../utils/request';
import '../static/style/Pages/adminIndex.css';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('openId')) {
      props.history.push('/login');
    }
  }, []);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    request({
      method: 'get',
      url: 'logout'
    }).then(res => {
      if (res.data === '登出成功') {
        localStorage.removeItem('openId');
        message.success('已安全退出登录');
        props.history.push('/login');
      }
    }).catch(() => {});
  };

  const handleMenuClick = (e) => {
    if (e.key === 'workplace') {
      props.history.push('/index');
    } else if (e.key === 'addArticle') {
      props.history.push('/index/add');
    } else if (e.key === 'articleList') {
      props.history.push('/index/list');
    } else if (e.key === 'logout') {
      handleLogout();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
        <Menu theme="dark" defaultSelectedKeys={['workplace']} mode="inline" onClick={handleMenuClick}>
          <Menu.Item key="workplace">
            <Icon type="pie-chart" />
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="desktop" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>留言管理</span>
          </Menu.Item>
          <Menu.Item key="logout">
            <Icon type="logout" />
            <span>退出登录</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index/" exact component={WorkPlace} />
              <Route path="/index/add/" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list/" exact component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>LeeJersey.com ©2026 Created by LeeJersey</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
