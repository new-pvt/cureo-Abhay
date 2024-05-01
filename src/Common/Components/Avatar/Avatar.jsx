import React, { memo } from 'react'

const Avatar = ({src, className, onclick}) => {
  return (
    <>
    <img onClick={onclick} src={src} alt="Avatar" className={`rounded-full ${className}`} />
    </>
  )
}

export default memo(Avatar)