import React from 'react'
import { Alert, } from '@material-tailwind/react';

const Message = (props) => {
  return (
    <div className="fixed bottom-1 left-1">
        <Alert open={props.alertShow}
        icon={props.icon} 
        color={props.color}>
        {props.message}
        </Alert>
    </div>
  )
}

export default Message