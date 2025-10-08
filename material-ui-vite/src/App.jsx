import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';
import TestTable from './TestTable';
import MenuBar from './MenuBar';
export default function App() {
    return (
        <Container maxWidth='xl'>
            <MenuBar />
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
                    Thông tin sự cố
                </Typography>
                <TestTable />
                <Copyright />
            </Box>
        </Container>
    );
}
