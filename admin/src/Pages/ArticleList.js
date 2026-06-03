import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal, message, Button, Table } from 'antd';
import request from '../utils/request';

function ArticleList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  // 获取文章列表
  const getList = () => {
    request({
      method: 'get',
      url: 'getArticleList'
    }).then(res => {
      if (res.list) {
        setList(res.list);
      }
    });
  };

  // 删除文章
  const delArticle = (id) => {
    Modal.confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK，文章将被永久删除，不可恢复。',
      onOk() {
        request({
          method: 'get',
          url: 'delArticle/' + id
        }).then(res => {
          if (res.isSuccess) {
            message.success('文章删除成功');
            getList();
          } else {
            message.error('删除失败');
          }
        });
      },
      onCancel() {
        message.info('没有任何改变');
      },
    });
  };

  // 修改文章路由跳转
  const updateArticle = (id) => {
    props.history.push('/index/add/' + id);
  };

  // 定义 Table 组件的列名
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类别',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '发布时间',
      dataIndex: 'addTime',
      key: 'addTime',
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
      key: 'view_count',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => { updateArticle(record.id); }}>修改</Button>&nbsp;&nbsp;
          <Button type="danger" onClick={() => { delArticle(record.id); }}>删除</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={list} rowKey="id" />
    </div>
  );
}

export default ArticleList;
