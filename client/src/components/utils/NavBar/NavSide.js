import React, { useState } from 'react';
import { Menu } from 'antd';
import { BookFilled, HomeFilled, LikeFilled } from '@ant-design/icons';

const { SubMenu } = Menu

function NavSide() {

    const onmenuItemClick = (e) => {
        console.log('click ', e);
    }

    return (
        <Menu 
            onClick={onmenuItemClick}
            style={{ width: 240 , fontSize: '1rem'}}
            defaultSelectedKeys={['menu1']}
            mode="inline">
            <Menu.Item className="sideMenuItem" key="menu1" icon={<HomeFilled style={{ fontSize: '1.2rem' }}/>}> 홈 </Menu.Item>
            <Menu.Item className="sideMenuItem" key="menu2" icon={<BookFilled style={{ fontSize: '1.2rem' }}/>}> 구독 </Menu.Item>
            <Menu.Item className="sideMenuItem" key="muen3" icon={<LikeFilled style={{ fontSize: '1.2rem' }}/>}> 좋아요 표시한 영상 </Menu.Item>
        </Menu>
    )
}

export default NavSide
