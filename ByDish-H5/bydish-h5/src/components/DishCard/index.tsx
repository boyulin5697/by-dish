import React from 'react'

import { Card }from 'antd'

const { Meta } = Card;

export interface CardInput{
    src:string,
    title:string,
    description:string
}

export default function DishCard(props:CardInput) {
  return (
    <div className='dish-card'>
      <Card
        style={{width: 300}}
        cover ={
            <img alt={props.title}
                src={props.src}
            />}
        >
        <Meta title = {props.title} description = {props.description}/>
      </Card>
    </div>
  )
}
