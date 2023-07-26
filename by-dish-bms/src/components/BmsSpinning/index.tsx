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
export default function BmsSpinning() {
  return (
    <div className='bms-spin'>
        <Spin size="large" />
    </div>
  )
}
