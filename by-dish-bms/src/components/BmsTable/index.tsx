import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { ExpandableConfig } from 'antd/es/table/interface';
import React from 'react'

/**
 * 封装procomponent 后的table组建，支持内嵌列表
 * 
 * @author by.
 * @date 2023/7/23
 * @param data 
 * @returns 
 */

interface Props<T>{
  columns: ProColumns<T>[],
  data:T[], 
  headerTitle?:boolean,
  search?:any,
  page?:any, 
  expendConfig?:ExpandableConfig<T> | any
}

export default function BmsTable<T extends Record<string,any>>(props:Props<T>) {
    const { columns, data, headerTitle, search, page, expendConfig } = props
    return (
        <div>
            <ProTable
                columns={columns}
                headerTitle={headerTitle}
                search={search}
                options={false}
                dataSource={data}
                pagination={page}
                expandable={expendConfig}
            />
          </div>
      )
}
