import React, { memo } from 'react'

const Avatar = ({src, avatar = "Avatar", className, onclick}) => {
  return (
    <>
    <img onClick={onclick} src={src} alt={avatar} className={`rounded-full ${className}`} />
    </>
  )
}

export default memo(Avatar)