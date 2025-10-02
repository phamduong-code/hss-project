import React from 'react'
import NavMenu from './NavMenu'

const HeaderBar = (props:any) => {
  return (
      <div className="navbar bg-base-100 shadow-sm">
        <NavMenu onLogout={props.onLogout} />
    </div>
  )
}

export default HeaderBar