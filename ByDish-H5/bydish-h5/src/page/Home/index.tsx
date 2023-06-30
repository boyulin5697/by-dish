import React, { useEffect, useState } from 'react'
import './index.css'
import { Spin, Anchor, Row, Col, Carousel, Divider } from 'antd';
import DishCard, { CardInput } from '../../components/DishCard';

interface HomeResources{
  hot:CardInput[],
  recommand:CardInput[],
  pastMenus:CardInput[]
}

const mock:HomeResources = {
  hot:[{
    src:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ace322ccb9f945c9a3b14152b9543b92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?',
    title:'hello',
    description:'hey'
  },{
    src:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ace322ccb9f945c9a3b14152b9543b92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?',
    title:'hello',
    description:'hey'
  },{
    src:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ace322ccb9f945c9a3b14152b9543b92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?',
    title:'hello',
    description:'hey'
  },{
    src:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ace322ccb9f945c9a3b14152b9543b92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?',
    title:'hello',
    description:'hey'
  },{
    src:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ace322ccb9f945c9a3b14152b9543b92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?',
    title:'hello',
    description:'hey'
  }],
  recommand:[{
    src:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ace322ccb9f945c9a3b14152b9543b92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?',
    title:'hello',
    description:'hey'
  },
  {
    src:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ace322ccb9f945c9a3b14152b9543b92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?',
    title:'hello',
    description:'hey'
  }
],
  pastMenus:[{
    src:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ace322ccb9f945c9a3b14152b9543b92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?',
    title:'hello',
    description:'hey'
  }]
}



export default function Home() {

  const [data, setData] = useState<HomeResources>()

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className="homepage">
      <Spin spinning = {loading} delay={5} size={"large"}>
      <Row>
        <Col span = {4} className='anchor-bar'>
          <Anchor
          offsetTop={50}
          items={[
            {
              key:'最受欢迎',
              href:'#hot-title',
              title:'最受欢迎'
            },
            {
              key:'主厨推荐',
              href:'#recommand',
              title:'主厨推荐'
            },
            {
              key:'往期菜单组合',
              href:'#past-menus',
              title:'往期菜单组合'
            },

          ]}
          />
        </Col>
        <Col span= {20}>
          <div id='hot-title' className='hot-title'>最受欢迎</div>
          <div id='hot' className="hot">
            {
              mock.hot.map((card) => {
                return <DishCard src = {card.src}
                title= {card.title}
                description= {card.description}
                ></DishCard>
              })
            }
          </div>
          <div className="recommand">
            <div id = "recommand" className='recommand-title'>主厨推荐</div>
            <Carousel autoplay>
              {
                mock.recommand.map((card) => {
                  return(
                    <div className='recommand-carousel'>
                      <img alt = {card.title} src= {card.src}/>
                    </div>
                  )
                })
              }
            </Carousel>
          </div>
          <div className="past-menus">
              <div id='past-menus'>往期菜单组合</div>
              <div id='hot' className="hot">
              {
                mock.hot.map((card) => {
                  return <DishCard src = {card.src}
                  title= {card.title}
                  description= {card.description}
                  ></DishCard>
                })
              }
          </div>
          </div>
        </Col>
      </Row>
      </Spin>
    </div>
  )
}
