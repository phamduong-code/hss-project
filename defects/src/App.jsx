import { useState } from 'react';

import './App.css';
import Layout from './components/Layout.jsx';
import ListDefects from './components/ListDefects.jsx';

function App() {
    return (
        <>
            <Layout>
                <ListDefects />
            </Layout>
        </>
    );
}

export default App;
