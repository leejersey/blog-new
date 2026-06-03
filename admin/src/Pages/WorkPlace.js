import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Card, Row, Col, Statistic, Icon, List } from 'antd';
import request from '../utils/request';

function WorkPlace(props) {
  const [stats, setStats] = useState({
    articleCount: 0,
    totalViews: 0,
    typeStats: []
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = () => {
    request({
      method: 'get',
      url: 'getWorkPlaceInfo'
    }).then(res => {
      setStats({
        articleCount: res.articleCount,
        totalViews: res.totalViews,
        typeStats: res.typeStats
      });
    }).catch(() => {});
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="已发布文章总数"
              value={stats.articleCount}
              prefix={<Icon type="file-markdown" />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="博客总浏览量"
              value={stats.totalViews}
              prefix={<Icon type="fire" />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
      <br />
      <Card title="文章分类统计列表" bordered={false}>
        <List
          itemLayout="horizontal"
          dataSource={stats.typeStats}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Icon type="folder" style={{ fontSize: '18px', color: '#1890ff' }} />}
                title={item.typeName}
                description={`该分类下共有文章 ${item.count} 篇`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default WorkPlace;
