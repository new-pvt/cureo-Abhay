import React, { memo } from 'react'

const ButtonWithIcon = ({children, onclick}) => {
  return (
    <button onClick={onclick} className='border border-c18 text-base flex justify-center gap-[5px] items-center w-full py-2.5 rounded-[5px] font-f3 font-w1 text-c4'>{children}</button>
  )
}

export default memo(ButtonWithIcon)