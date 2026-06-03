import React, { useState, useEffect } from 'react';
import marked from 'marked';
import 'antd/dist/antd.css';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import request from '../utils/request';
import '../static/style/Pages/addArticle.css';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章ID，0为新增，大于0为编辑
  const [articleTitle, setArticleTitle] = useState(''); // 文章标题
  const [articleContent, setArticleContent] = useState(''); // 正文内容
  const [markdownContent, setMarkdownContent] = useState('预览内容'); // html预览内容
  const [introducemd, setIntroducemd] = useState(''); // 简介的markdown
  const [introducehtml, setIntroducehtml] = useState('等待编辑'); // 简介的html预览
  const [showDate, setShowDate] = useState(''); // 发布日期
  const [typeInfo, setTypeInfo] = useState([]); // 分类信息
  const [selectedType, setSelectedType] = useState('请选择文章类型'); // 选择的文章分类

  useEffect(() => {
    getTypeInfo();
    // 检查是否有ID传入，有则是修改，没有则是新增
    let tmpId = props.match.params.id;
    if (tmpId) {
      setArticleId(tmpId);
      getArticleById(tmpId);
    }
  }, []);

  // 监听正文内容变化
  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  // 监听简介变化
  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  // 获取文章分类
  const getTypeInfo = () => {
    request({
      method: 'get',
      url: 'getTypeInfo'
    }).then(res => {
      setTypeInfo(res.data);
    });
  };

  // 根据ID获取文章详情
  const getArticleById = (id) => {
    request({
      method: 'get',
      url: 'getArticleById/' + id
    }).then(res => {
      let articleInfo = res.data[0];
      setArticleTitle(articleInfo.title);
      setArticleContent(articleInfo.article_content);
      let html = marked(articleInfo.article_content);
      setMarkdownContent(html);
      setIntroducemd(articleInfo.introduce);
      let introHtml = marked(articleInfo.introduce);
      setIntroducehtml(introHtml);
      setShowDate(articleInfo.addTime);
      setSelectedType(articleInfo.typeId);
    });
  };

  // 保存或更新文章
  const saveArticle = () => {
    if (!selectedType || selectedType === '请选择文章类型') {
      message.error('必须选择文章类别');
      return false;
    } else if (!articleTitle) {
      message.error('文章标题不能为空');
      return false;
    } else if (!articleContent) {
      message.error('文章内容不能为空');
      return false;
    } else if (!introducemd) {
      message.error('文章简介不能为空');
      return false;
    } else if (!showDate) {
      message.error('发布日期不能为空');
      return false;
    }

    let dataProps = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      addTime: (new Date(showDate).getTime()) / 1000, // 存 Unix 时间戳
    };

    if (articleId === 0) {
      dataProps.view_count = 0;
      request({
        method: 'post',
        url: 'addArticle',
        data: dataProps
      }).then(res => {
        if (res.isSuccess) {
          setArticleId(res.insertId);
          message.success('文章保存成功');
          props.history.push('/index/list');
        } else {
          message.error('文章保存失败');
        }
      });
    } else {
      dataProps.id = articleId;
      request({
        method: 'post',
        url: 'updateArticle',
        data: dataProps
      }).then(res => {
        if (res.isSuccess) {
          message.success('文章保存成功');
          props.history.push('/index/list');
        } else {
          message.error('保存失败');
        }
      });
    }
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large"
                value={articleTitle}
                onChange={(e) => { setArticleTitle(e.target.value); }}
              />
            </Col>
            <Col span={4}>
              <Select
                value={selectedType}
                size="large"
                onChange={(value) => { setSelectedType(value); }}
              >
                {typeInfo.map((item, index) => {
                  return (<Option key={index} value={item.Id}>{item.typeName}</Option>);
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="撰写博客正文内容"
                value={articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              />
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存草稿</Button>&nbsp;&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
              <br /><br />
            </Col>
            <Col span={24}>
              <TextArea
                rows={4}
                placeholder="撰写文章简介"
                value={introducemd}
                onChange={changeIntroduce}
              />
              <br /><br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              />
            </Col>
            <Col span={24}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  onChange={(date, dateString) => { setShowDate(dateString); }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
