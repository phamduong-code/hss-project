import React from 'react'
import NavMenu from '../components/NavMenu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <> 
      <NavMenu />
      {children}
    </>
  )
}

export default Layout