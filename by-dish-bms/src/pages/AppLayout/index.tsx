import {
    GithubFilled,
    InfoCircleFilled,
    QuestionCircleFilled,
  } from '@ant-design/icons';
  import type { ProSettings } from '@ant-design/pro-components';
  import {
    PageContainer,
    ProCard,
    ProLayout,
    SettingDrawer,
  } from '@ant-design/pro-components';
  import { useState } from 'react';
  import defaultProps from './_defaultProps';
  import { Link, useRoutes } from 'react-router-dom';
import { routers } from '../../router';
  
  export default function AppLayout(){
    const router = useRoutes(routers)
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
      layout: 'side',
    });
  
    const [pathname, setPathname] = useState('/welcome');
  
    return (
      <div
        id="test-pro-layout"
        style={{
          height: '100vh',
        }}
      >
        <ProLayout
          siderWidth={216}
          bgLayoutImgList={[
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              left: 85,
              bottom: 100,
              height: '303px',
            },
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              bottom: -68,
              right: -45,
              height: '303px',
            },
            {
              src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
              bottom: 0,
              left: 0,
              width: '331px',
            },
          ]}
          {...defaultProps}
          location={{
            pathname,
          }}
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            title: '七妮妮',
            size: 'small',
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              <InfoCircleFilled key="InfoCircleFilled" />,
              <QuestionCircleFilled key="QuestionCircleFilled" />,
              <GithubFilled key="GithubFilled" />,
            ];
          }}
          menuItemRender={(item, dom) => {
             setPathname(item.path ?? '/welcome')
             return( 
                  <Link to={item.path ?? '/welcome'}>
                    {dom}
                  </Link>
              )
          }}
          {...settings}
        >
          <PageContainer>
            <ProCard
              style={{
                height: '90vh',
                minHeight: 500,
              }}
            >
              <div>
                {router}
              </div>
            </ProCard>
          </PageContainer>
        </ProLayout>
        <SettingDrawer
          pathname={pathname}
          enableDarkTheme
          getContainer={() => document.getElementById('test-pro-layout')}
          settings={settings}
          onSettingChange={(changeSetting) => {
            setSetting(changeSetting);
          }}
          disableUrlParams={false}
        />
      </div>
    );
  };
  