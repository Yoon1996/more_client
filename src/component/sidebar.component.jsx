import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd'
import React, { useState, Link } from 'react'
import MyInfoPage from '../page/my_info.page';
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  
  
  const items = [
    getItem('내 정보','/my-account/my_info_page', [
    ]),
    getItem('카테고리 관리', '/my-account/category_list_page', [
    ]),
    getItem('탈퇴하기', '/my-account/withdraw_page', [
    ]),
  ];
  
  const SidebarComponent = () => {
    
    const navigate = useNavigate();
  
    // const [theme, setTheme] = useState('dark'); //dark 테마
  const [current, setCurrent] = useState('1');

  
  const onClick = (e) => {
    // setCurrent(e.key);
    navigate(e.key)
  };

  return (
    <Menu
        // theme={theme} //dark 테마
        onClick={onClick}
        style={{ width: 150 }}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
  )
}

export default SidebarComponent