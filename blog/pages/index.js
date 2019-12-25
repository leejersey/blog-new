import React,{useState} from 'react'
import {Row, Col , List ,Icon} from 'antd'

import '../static/style/pages/index.css'

import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Author from '../components/Author'
import Advert from '../components/Advert'

const Home = () => {
  const [ mylist , setMylist ] = useState(
    [
      {title:'title1',context:'内容xxxx'},
      {title:'title2',context:'内容xxxx'},
      {title:'title3',context:'内容xxxx'},
      {title:'title4',context:'内容xxxx'},
    ]
  )
  return (
  <div>
    <Head>
      <title>Home</title>
    </Head>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
         <div>    
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">{item.title}</div>
                <div className="list-icon">
                  <span><Icon type="calendar" /> 2019-06-28</span>
                  <span><Icon type="folder" /> 视频教程</span>
                  <span><Icon type="fire" /> 5498人</span>
                </div>
                <div className="list-context">{item.context}</div>  
              </List.Item>
            )}
          />    
        </div>
      </Col>

      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author/>
        <Advert/>
      </Col>
    </Row>
    <Footer/>
 </div>
)
}

export default Home