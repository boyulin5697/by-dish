import { Spin } from 'antd'
import React from 'react'
import './index.css'

/**
 * Spinning
 *
 *
 * @author by.
 * @date 2023/7/26
 * @constructor
 */

export type BmsSpinningProps = {
    loading?:boolean
}

export default function BmsSpinning(props:BmsSpinningProps) {
  return (
    <div className='bms-spin'>
        <Spin size="large"
              spinning={props.loading==undefined?true:props.loading}
        />
    </div>
  )
}
