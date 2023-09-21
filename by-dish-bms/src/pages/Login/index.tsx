import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProFormText,
} from '@ant-design/pro-components';
import type { CSSProperties } from 'react';
import {DoPost} from "../../apis/request";
import { message } from 'antd';
import useAuth from "../../hooks/Auth";
import {useNavigate} from "react-router-dom";

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

type LoginInput = {
    loginCredit:string,
    password:string
}

export default () => {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const onSubmit = async(input:LoginInput) => {
        await DoPost(input, "/user/wt/login").then((value) => {
            if(value.resp.code != 200){
                messageApi.error(value.resp.message, 3)
            }else{
                messageApi.success(value.resp.message, 2)
                setAuth(value.resp.data)
                navigate("/")
            }
        })
    }


    return (
        <div
            style={{
                backgroundColor: 'white',
                height: 'calc(100vh - 48px)',
                margin: -24,
            }}
        >
            {contextHolder}
            <LoginFormPage<LoginInput> onFinish={onSubmit}
                backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
                logo="../../bydish.png"
                title="By-Dish-BMS"
                subTitle="点餐系统后台管理"

                actions={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                    </div>
                }
            >
                    <>
                        <ProFormText
                            name="loginCredit"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'请输入用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'请输入密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
            </LoginFormPage>
        </div>
    );
};