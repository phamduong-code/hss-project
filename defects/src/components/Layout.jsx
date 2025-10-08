import React from 'react';
import MenuBar from './MenuBar';
import FooterBar from './FooterBar';
import Navbar from './Navbar';
const Layout = ({ children }) => {
    console.log('first');
    return (
        <>
            <Navbar />
            <MenuBar />
            {children}
            <FooterBar />
        </>
    );
};

export default Layout;
