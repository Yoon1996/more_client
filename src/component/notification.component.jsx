import { Alert} from 'antd'
import React from 'react'

const NotificationComponent = () => {
  return (
    <Alert style={{marginTop: '20px'}} message="카테고리가 성공적으로 저장 됐습니다.!" type="success" />
  )
}

export default NotificationComponent