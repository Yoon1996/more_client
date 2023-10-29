import React from 'react'
import HeaderLayout from '../layout/header.layout'
import { Outlet } from 'react-router-dom'
import { Col, Row } from 'antd'
import SidebarComponent from '../component/sidebar.component'


const MyAccountTemplate = () => {
  return (
<>
    <HeaderLayout isMyAccount={false}/>
    <main>
      <div className="my-account__content">
    <Row className='main__layout' justify="center">
      <Col span={4}>
        <SidebarComponent></SidebarComponent>
      </Col>
      <Col span={20}>
        <Outlet></Outlet>
      </Col>
      
    </Row>
    </div>
    </main>
    </>  )
}

export default MyAccountTemplate